from flask import Flask, request, redirect, url_for, jsonify, session, render_template, abort
from functools import wraps
import requests
import urllib.parse
import os
import json
import sys


SETTINGS_FILENAME = 'loco.json'
if not os.path.exists(SETTINGS_FILENAME):
    print("Cannot find settings file `{}`".format(SETTINGS_FILENAME))
    sys.exit(1)
app_settings = json.load(open(SETTINGS_FILENAME))

app = Flask(__name__)
app.config['RC_API_URI'] = 'http://www.recurse.com/api/v1'
app.config['RC_OAUTH_AUTH_URI'] = 'https://www.recurse.com/oauth/authorize'
app.config['RC_OAUTH_TOKEN_URI'] = 'https://www.recurse.com/oauth/token'
app.config['RC_OAUTH_CLIENT_ID'] = app_settings['client_id']
app.config['RC_OAUTH_CLIENT_SECRET'] = app_settings['client_secret']
app.config['RC_OAUTH_CLIENT_REDIRECT_URI'] = app_settings['redirect_uri']
app.config['SESSION_SECRET'] = app_settings['session_secret']


# DB Stuff
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2.types import Geometry
from geoalchemy2.elements import WKTElement, WKBElement
from geoalchemy2.shape import to_shape


# TODO: Read database credentials from file, env variables etc.
app.config['SQLALCHEMY_DATABASE_URI'] = app_settings["db_uri"]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class RcLoco(db.Model):
    __tablename__ = 'locos'
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(256))
    image = db.Column(db.Text)
    address = db.Column(db.Text)
    coords = db.Column(Geometry(geometry_type='POINT', srid=4326))
    is_shared = db.Column(db.Boolean, default=False)


class ModelSerializer(json.JSONEncoder):

    OMITTED_KEYS = {'_sa_instance_state'}

    def default(self, o):
        try:
            d = {}
            for k, v in o.__dict__.items():
                if k not in self.OMITTED_KEYS:
                    if k == "coords" and isinstance(v, WKTElement) \
                       or isinstance(v, WKBElement):
                        lat, lng = list(to_shape(v).coords)[0]
                        d['lat'] = lat
                        d['lng'] = lng
                    else:
                        d[k] = v
            return d
        except AttributeError:
            return {}


# App

sessions = {}


def check_authentication(method):
    @wraps(method)
    def auth_checked(*args, **kwargs):
        if 'user' not in session or session['user'] not in sessions:
            params = {
                "client_id": app.config['RC_OAUTH_CLIENT_ID'],
                "redirect_uri": app.config['RC_OAUTH_CLIENT_REDIRECT_URI'],
                "response_type": 'code'
            }
            url_params = urllib.parse.urlencode(params)
            oauth_url = "%s?%s" % (app.config['RC_OAUTH_AUTH_URI'], url_params)
            return redirect(oauth_url)
        else:
            # User already authenticated
            return method(*args, **kwargs)
    return auth_checked

@app.route('/', defaults={'lat':None, 'lng':None})
@app.route('/share/<lat>/<lng>')
@check_authentication
def index(lat, lng):
    return render_template('index.html')


@app.route('/token', methods=['GET', 'POST'])
def access_token():
    code = request.args.get('code')
    params = {
        'client_id': app.config['RC_OAUTH_CLIENT_ID'],
        'client_secret': app.config['RC_OAUTH_CLIENT_SECRET'],
        'redirect_uri': app.config['RC_OAUTH_CLIENT_REDIRECT_URI'],
        'grant_type': 'authorization_code',
        'code': code
    }

    req = requests.post(app.config['RC_OAUTH_TOKEN_URI'], data=params)
    data = json.loads(req.text)
    if 'access_token' in data:

        token = data['access_token']
        user = get_user(token)

        # save user session
        user_id = user['id']

        session['user'] = user_id
        sessions[user_id] = token

        return redirect(url_for('index'))
    else:
        abort(401, 'Go away!')


def make_header(access_token):
    headers = {
        'Authorization': 'Bearer %s' % access_token,
        'Accepts' : 'application/json'
    }
    return headers


def serialize(method):
    @wraps(method)
    def serialized_response(*args, **kwargs):
        response = method(*args, **kwargs)
        if hasattr(response, 'content_type'):
            # Don't attempt to serialize Werkzeug response wrappers
            return response
        return json.dumps(response, cls=ModelSerializer)
    return serialized_response


@app.route('/locos', methods=['GET'])
@serialize
@check_authentication
def get_locos():
    locos = RcLoco.query.filter_by(is_shared=True).filter(RcLoco.coords!=None).all()
    return locos


@app.route('/update', methods=['POST'])
@serialize
@check_authentication
def update_loco():
    location_data = request.get_json()
    if not location_data:
        abort(400)
    if 'lat' not in location_data and 'lng' not in location_data:
        abort(400)
    lat = location_data['lat']
    lng = location_data['lng']
    loco_id = session['user']
    loco = RcLoco.query.filter_by(id=loco_id).first()
    loco.coords = WKTElement('POINT({} {})'.format(lat, lng),
                             srid=4326)
    loco.is_shared = True
    db.session.add(loco)
    db.session.commit()
    return {"result": "success"}

# def get_batch(access_token, batch_id):
#     headers = make_header(access_token)
#     req = requests.get("%s/batches/%d/people" % (app.config['RC_API_URI'], batch_id), headers=headers)
#     return req.json()

# def get_batches(access_token):
#     headers = make_header(access_token)
#     req = requests.get("%s/batches" % app.config['RC_API_URI'], headers=headers)
#     return json.loads(req.text)


def get_user(access_token):
    headers = make_header(access_token)
    req = requests.get("%s/people/me" % app.config['RC_API_URI'], headers=headers)

    u = req.json()
    # If user data is not saved in our db, save
    if 'id' not in u:
        abort(401)
    loco = RcLoco.query.get(int(u['id']))
    if not loco:
        name = "{} {}".format(u['first_name'], u['last_name'])
        loco = RcLoco(
            id=u['id'],
            name=name,
            image=u['image'],
        )
        db.session.add(loco)
        db.session.commit()
    return u


if __name__ == '__main__':
    app.debug = True
    app.secret_key = app.config['SESSION_SECRET']
    port = 5000
    app.run(host='0.0.0.0', port=port)

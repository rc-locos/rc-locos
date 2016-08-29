from flask import Flask, redirect
import json
from urllib.parse import urlencode

OAUTH_SETTINGS_FILENAME = 'loco.json'
RC_OAUTH_AUTH_URI = 'https://www.recurse.com/oauth/authorize'
RC_OAUTH_TOKEN_URI = 'https://www.recurse.com/oauth/token'

app = Flask(__name__)
oauth_settings = json.load(open(OAUTH_SETTINGS_FILENAME))
app.config['RC_OAUTH_CLIENT_ID'] = oauth_settings['id']
app.config['RC_OAUTH_CLIENT_SECRET'] = oauth_settings['secret']
app.config['RC_OAUTH_CLIENT_REDIRECT_URI'] = oauth_settings['redirect_uri']

def get_oauth_url(oauth_auth_uri, oauth_client_id, oauth_redirect_uri):
    params = {"client_id": oauth_client_id,
              "redirect_uri": oauth_redirect_uri,
              "response_type": "code"}
    url_encoded_parameters = urlencode(params)
    return "{}?{}".format(oauth_auth_uri, url_encoded_parameters)

@app.route('/', methods=['GET'])
def index():
    oauth_url = get_oauth_url(RC_OAUTH_AUTH_URI,
                              app.config['RC_OAUTH_CLIENT_ID'],
                              app.config['RC_OAUTH_CLIENT_REDIRECT_URI'])
    return redirect(oauth_url)

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')

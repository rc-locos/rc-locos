# rc-locos

Find locos of other locos.

[url](http://rc-locos.recurse.com)

# Running production server

gunicorn -w 1 -b 0.0.0.0:5000 -p ./loco.pid -D loco:app

# Getting Started

copy server/loco.json.example to server/loco.json and fill in the values

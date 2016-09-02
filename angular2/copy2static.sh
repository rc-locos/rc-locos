#!/bin/bash


STATIC_DIR='../server/static'

# Create static directories
if [ ! -d "$STATIC_DIR" ]; then
    mkdir -p $STATIC_DIR/{img,css,js}
fi

# Copy images
cp dist/static/img/* $STATIC_DIR/img/

# Copy css
cp dist/css/app.*.css $STATIC_DIR/css/app.css

# Copy js files
cp dist/js/app.*.js    $STATIC_DIR/js/app.js
cp dist/js/common.*.js $STATIC_DIR/js/common.js
cp dist/js/vendor.*.js $STATIC_DIR/js/vendor.js


#!/bin/bash


STATIC_DIR='../server/static'

# Create static directories
if [ ! -d "$STATIC_DIR" ]; then
    mkdir -p $STATIC_DIR/{css,js}
fi

# # Copy images
# cp dist/static/img/* $STATIC_DIR/img/

# Copy css
cp build/static/css/main.*.css $STATIC_DIR/css/main.css

# Copy js files
cp build/static/js/main.*.js   $STATIC_DIR/js/main.js

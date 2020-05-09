#!/bin/bash

function build () {
    parcel build src/styles.scss
    cp dist/styles.css dist/styles.min.css
    parcel build --no-minify src/styles.scss
    cp src/styles.scss dist
}

"$@"

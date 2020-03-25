#!/bin/bash


function build () {
    parcel build src/styles.scss
    cp dist/styles.css dist/styles.min.css
    parcel build --no-minify src/styles.scss
    src/styles.scss dist
}

"$@"

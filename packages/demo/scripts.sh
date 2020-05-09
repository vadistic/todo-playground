#!/bin/bash

function noop () {
    echo 'noop()'
    # do stuff
}

"$@"

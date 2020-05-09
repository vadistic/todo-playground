#!/bin/bash

function run_docker () {
    echo 'run_docker()'
    HAS_CONTAINER=$(sudo docker ps -a | grep "mongodb")

    if [ ! -z "$HAS_CONTAINER" ]; then
        echo 'start'
        sudo docker start mongodb
    else
        echo 'create'
        sudo docker run -d --rm \
            -p 27017-27019:27017-27019 \
            --name mongodb \
            mongo
    fi
}


function bootstrap () {
    echo 'bootstrap()'
   run_docker
}

"$@"

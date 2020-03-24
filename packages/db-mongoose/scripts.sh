#!/bin/bash

function run_docker () {
    HAS_CONTAINER=$(sudo docker ps -a | grep "mongodb")
    
    
    if [ ! -z "$HAS_CONTAINER" ]; then
        echo 'start'
        sudo docker start mongodb
    else
        echo 'create'
        sudo docker run -d --rm -p 27017-27019:27017-27019 --name mongodb mongo
    fi
}

# https://docs.mongodb.com/v4.0/release-notes/4.0-compatibility/#deprecate-copydb-clone-cmds
function clone_test_db () {
    mongodump --archive --db=dev | mongorestore --archive  --nsFrom='dev.*' --nsTo='test.*'
}

function clone_temp_db () {
    mongodump --archive --db=test | mongorestore --archive  --nsFrom='test.*' --nsTo='test-temp.*'
}


function bootstrap () {
    run_docker
    
    # seed
    
    clone_test_db
}

"$@"

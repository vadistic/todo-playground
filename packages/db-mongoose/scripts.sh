#!/bin/bash

function run_docker () {
    echo 'run_docker()'
    HAS_CONTAINER=$(sudo docker ps -a | grep "mongodb")
    
    
    if [ ! -z "$HAS_CONTAINER" ]; then
        echo 'start'
        sudo docker start mongodb
    else
        echo 'create'
        sudo docker run -d --rm -p 27017-27019:27017-27019 --name mongodb mongo
    fi
}

function run_mongoku () {
    echo 'run_mongoku()'
    sudo docker run -d --name mongoku -p 3100:3100 huggingface/mongoku
}

# https://docs.mongodb.com/v4.0/release-notes/4.0-compatibility/#deprecate-copydb-clone-cmds
function db_cp_test () {
    echo 'db_cp_test()'
    mongodump --archive --db=dev | mongorestore --archive  --nsFrom='dev.*' --nsTo='test.*'
}

function db_cp_temp () {
    echo 'db_cp_temp()'
    mongodump --archive --db=test | mongorestore --archive  --nsFrom='test.*' --nsTo='test-temp.*'
}


function bootstrap () {
    run_docker
    
    # seed
    
    db_cp_test
}

"$@"

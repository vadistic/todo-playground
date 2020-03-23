#!/bin/bash

function run_docker () {
    sudo docker run -d -p 27017-27019:27017-27019 --name mongodb mongo
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

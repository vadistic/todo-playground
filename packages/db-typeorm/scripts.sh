#!/bin/bash

function seed () {
    echo 'seed...'
    ts-node -T ./src/scripts/seed.ts
}

function clean_db {
    echo 'clean_db...'
    rm -rf temp/*.db
}

function cp_test_db {
    echo 'cp_test_db...'
    cp ./temp/dev.db ./temp/test.db
}

function bootstrap () {
    echo 'bootstrap...'
    clean_db
    seed
    cp_test_db
}


"$@"


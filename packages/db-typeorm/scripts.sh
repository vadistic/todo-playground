#!/bin/bash

function seed () {
    echo 'seed()'
    ts-node -T ./src/scripts/seed.ts
}

function db_clean {
    echo 'db_clean()'
    rm -rf temp/*.db
}

function db_cp_test {
    echo 'db_cp_test()'
    cp ./temp/dev.db ./temp/test.db
}

function bootstrap () {
    echo 'bootstrap()'
    db_clean
    seed
    db_cp_test
}


"$@"


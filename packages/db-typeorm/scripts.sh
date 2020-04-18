#!/bin/bash

function db_seed () {
    echo 'db_seed()'
    ts-node -T './scripts/seed.ts'
}

function db_clean {
    echo 'db_clean()'
    rm -rf tmp/*.db
}

function db_cp_test {
    echo 'db_cp_test()'
    cp ./tmp/dev.db ./tmp/test.db
}

function bootstrap () {
    echo 'bootstrap()'
    db_clean
    db_seed
    db_cp_test
}


"$@"


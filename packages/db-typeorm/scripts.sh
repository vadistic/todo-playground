#!/bin/bash

function db_seed () {
    echo 'db_seed()'
    ts-node -T -e 'require("./src/test/seed").seed()'
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
    db_seed
    db_cp_test
}


"$@"


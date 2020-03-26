#!/bin/bash


function db_clean () {
    echo 'db_clean()'
    rm -rf temp/*.db
}

function db_seed () {
    echo 'db_seed()'
    ts-node -T -e 'require("./src/test/seed").seed()'
}

function db_cp_test () {
    echo 'db_cp_test()'
    cp ./temp/dev.db ./temp/test.db
}

function db_migrate_init () {
    echo 'db_migrate_init()'
    rm -rf prisma/migrations
    yarn prisma2 migrate save --experimental --name init
}

function db_migrate () {
    echo 'db_migrate_init()'
    yarn prisma2 migrate save --experimental --name init
}

function db_migrate_up () {
    echo 'db_migrate_up()'
    yarn prisma2 migrate up --experimental -c
}


function bootstrap () {
    echo 'bootstrap()'
    db_clean
    db_migrate_init
    db_migrate_up
    db_seed
    db_cp_test
}

function refresh () {
    echo 'refresh()'
    db_clean
    db_migrate
    db_migrate_up
    db_seed
    db_cp_test
}


"$@"


#!/bin/bash


function db_clean () {
    echo 'db_clean()'
    # need be in sync with .env.json/.env.test.json
    rm -rf tmp/*.db
}

function db_seed () {
    echo 'db_seed()'
    ts-node -T -e 'require("./src/test/seed").seed()'
}

function db_cp_test () {
    echo 'db_cp_test()'
    # need be in sync with .env.json/.env.test.json
    cp ./tmp/dev.db ./tmp/test.db
}

function db_migrate_init () {
    echo 'db_migrate_init()'
    rm -rf prisma/migrations
    yarn prisma migrate save --experimental --name init
}

function db_migrate () {
    echo 'db_migrate_init()'
    yarn prisma migrate save --experimental --name init
}

function db_migrate_up () {
    echo 'db_migrate_up()'
    yarn prisma migrate up --experimental -c
}


function bootstrap () {
    echo 'bootstrap()'
    db_clean
    db_migrate_init
    db_migrate_up
    db_cp_test
    db_seed
}

function refresh () {
    echo 'refresh()'
    db_clean
    db_migrate
    db_migrate_up
    db_cp_test
    db_seed
}


"$@"


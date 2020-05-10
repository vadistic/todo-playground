#!/bin/bash


function clean () {
    echo 'clean()'
    # need be in sync with .env.json/.env.test.json
    rm -rf tmp/*.db
}

function seed_local () {
    echo 'seed_local()'
    ts-node -T './scripts/seed-local.ts'
}

function cp_test () {
    echo 'cp_test()'
    # need be in sync with .env/.env.test
    cp ./tmp/local.db ./tmp/test.db
}

function migrate_init () {
    echo 'migrate_init()'
    rm -rf prisma/migrations
    yarn prisma migrate save --experimental --name init
}

function migrate_up () {
    echo 'migrate_up()'
    yarn prisma migrate up --experimental -c --auto-approve
}

function bootstrap () {
    echo 'bootstrap()'
    clean
    migrate_init
    migrate_up
    cp_test
    seed_local
}

"$@"


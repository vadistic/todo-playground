#!/bin/bash

function seed_local () {
    echo 'seed_local()'
    ts-node -T './scripts/seed-local.ts'
}

function bootstrap () {
    echo 'bootstrap()'
    rm -rf tmp/*.db
    seed_local
}


"$@"


#!/usr/bin/env bash

cd frontend \
    && npm install \
    && npm run build \
    && cd .. \
    && docker build . -t docker.kuylar.dev/istanbus \
    && docker push docker.kuylar.dev/istanbus

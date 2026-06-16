#!/bin/sh

set -e

echo "Waiting..."
until curl -s http://backend:3000/; do
    sleep 1
done

echo "Building..."
npm run build
echo "Starting..."
npm run start
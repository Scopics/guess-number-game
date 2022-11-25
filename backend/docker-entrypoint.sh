#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
yarn migration:run

# redis set key-event
redis-cli -h ${REDIS_HOST} CONFIG SET notify-keyspace-events KEA

# Start server
echo "Starting server"
yarn start:prod

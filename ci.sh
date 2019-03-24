#!/bin/bash
set -e

TAG="inveracity/cryosite:latest"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t $TAG -f Dockerfile .
docker push $TAG

#!/bin/bash
TAG="inveracity/cryosite:latest"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t $TAG -f dockerfile .
docker push $TAG

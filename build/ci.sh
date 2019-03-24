#!/bin/bash
set -e

TAG="inveracity/cryosite:latest"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t $TAG -f build/site.Dockerfile .
docker push $TAG
curl -k -s --header "token: $DEPLOY_TOKEN" $DEPLOY_URL

#!/bin/bash -x
docker run --name wcs_redis -p 6379:6379 -d redis

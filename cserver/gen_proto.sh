#!/bin/bash -x
protoc --cpp_out=src/types -Iprotobuf protobuf/*.proto

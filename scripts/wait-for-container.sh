#!/bin/bash

CONTAINER_NAME=$1
COUNT=0

# wait until container exists (5 mins max)
until [ "$(docker ps -aq -f name=$CONTAINER_NAME)" -o $((COUNT++)) -eq 10 ]; do
	sleep 30;
done

# docker network disconnect bridge $CONTAINER_NAME
# docker network connect codewind_network $CONTAINER_NAME

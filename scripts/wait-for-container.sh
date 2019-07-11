#!/bin/bash
###################################################################################
#
# Copyright 2019 IBM Corporation and others.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
###################################################################################

CONTAINER_NAME=$1
COUNT=0

# wait until container exists (5 mins max)
until [ "$(docker ps -aq -f name=$CONTAINER_NAME)" -o $((COUNT++)) -eq 10 ]; do
	sleep 30;
done

# docker network disconnect bridge $CONTAINER_NAME
# docker network connect codewind_network $CONTAINER_NAME

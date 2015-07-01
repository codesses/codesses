#!/bin/bash
if [ -z "$VCAP_APP_PORT" ];
then SERVER_PORT=5000;
else SERVER_PORT="$VCAP_APP_PORT";
fi
echo port is $SERVER_PORT


grunt serve --force --port=$SERVER_PORT
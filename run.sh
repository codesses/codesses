#!/bin/bash
if [ -z "$VCAP_APP_PORT" ];
then SERVER_PORT=5000;
else SERVER_PORT="$VCAP_APP_PORT";
fi
echo port is $SERVER_PORT


grunt serve:app --force --port=$SERVER_PORT

# node node_modules/http-server/bin/http-server app -p $SERVER_PORT -o
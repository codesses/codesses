#!/bin/bash
if [ -z "$VCAP_APP_PORT" ];
then SERVER_PORT=5000;
else SERVER_PORT="$VCAP_APP_PORT";
fi
echo port is $SERVER_PORT

# python manage.py collectstatic --noinput
# python manage.py migrate
python -m SimpleHTTPServer $SERVER_PORT
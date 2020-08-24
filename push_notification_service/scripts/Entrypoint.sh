#!/bin/sh
# ./scripts/wait-for-it.sh $LS_HOSTS --timeout=30 -- $FILEBEAT_HOME/filebeat -e -c $FILEBEAT_HOME/filebeat.yml&
./scripts/wait-for-it.sh $AMQP_URL --timeout=30 -- npm start
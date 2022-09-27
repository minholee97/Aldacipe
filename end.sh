#!/bin/sh

kill -9 `ps -ef|grep SNAPSHOT.jar|awk '{print $2}'` > /dev/null 2>&1 &
cd deploy/libs
nohup java -jar *SNAPSHOT.jar > /dev/null 2>&1 &
sudo service nginx reload

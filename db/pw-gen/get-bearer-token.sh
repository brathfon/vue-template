#!/bin/bash

scriptname=`basename $0`

if [ $# != 2 ]
then
  echo "usage: $scriptname user password"
  exit 1
fi

user=$1
password=$2



curl -X POST \
  http://localhost:3011/api/login \
  -H 'Postman-Token: 09dca224-6aaa-4649-b7ad-f89bd07d5be6' \
  -H 'cache-control: no-cache' \
  -d "email=$1&password=$2"

echo "bye"

exit 0

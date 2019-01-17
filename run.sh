#!/bin/sh

COMPOSE="docker-compose"

if [ $# -gt 0 ]; then
  if [ "$1" == "client" ]; then
    shift 1
    $COMPOSE exec client-vue "$@"
  elif [ "$1" == "client-react" ]; then
    shift 1
    $COMPOSE exec client-react "$@"
  elif [ "$1" == "api" ]; then
    shift 1
    $COMPOSE exec api-express "$@"
  else
    $COMPOSE "$@"
  fi
else
  $COMPOSE ps
fi
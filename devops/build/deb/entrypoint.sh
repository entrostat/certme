#!/bin/bash

cd /app
oclif pack deb

rsync -avh --progress /app/dist /app/dist-final

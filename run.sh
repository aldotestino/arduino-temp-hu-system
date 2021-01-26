#!/bin/bash

cd client;
npm i;
cd ../server;
npm i;
npm run build;
pm2 start;
pm2 save;
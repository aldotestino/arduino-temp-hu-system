#!/bin/bash

cd client;
npm i;
npm run build;
cd ../server;
npm i;
npm run build;
cd ..
pm2 start;
pm2 save;
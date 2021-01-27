# arduino-temp-hu-system by aldotestino

## Simple system to control temperature and humidty

### Version: 4.0.0

## Setting up

* Run `TempAndHu.ino` from the `/server` folder on your Arduino.
* in `/server/src/index.ts` file change the `comPort` to match the one of your system.
* Open your terminal and run the `run` script

    ```sh
    chmod +x ./run.sh
    ./run.sh
    ```
    This script will install `pm2` globally on your system, install and build both client and server and then it will start the project and save the pm2 configuration so you don't have to manually start the project.
* To run the project with `pm2` simply run

    ```sh
    pm2 start ecosystem.config.js
    ```
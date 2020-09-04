import express, { Application, Response } from 'express';
import SerialPort from 'serialport';
import path from 'path';

import Stats from './stats';

const baudRate: number = 9600;
const comPort: string = 'Com5';

let currentTemp: number;
let currentHu: number;
let currentDate: Date;
let temps: Array<number> = [];
let hus: Array<number> = [];
let dates: Array<Date> = [];

const Readline = SerialPort.parsers.Readline;
const serialPort = new SerialPort(comPort, {
  baudRate
});
const parser = new Readline({ delimiter: '\n' });
serialPort.pipe(parser);
parser.on('data', (data: string) => {
  try {
    const [t, h]: Array<string> = data.split(':');
    currentTemp = parseFloat(t);
    currentHu = parseFloat(h);
    currentDate = new Date();
    if (temps.length > 100 && hus.length > 100 && dates.length > 100) {
      temps = temps.slice(1);
      hus = hus.slice(1);
      dates = dates.slice(1);
    }
    hus.push(currentHu);
    temps.push(currentTemp);
    dates.push(currentDate);

    console.log(`Temp: ${currentTemp}, Hu: ${currentHu}, Date: ${currentDate.toLocaleTimeString()}`);
  } catch (err) {
    console.log('Parsing error');
  }
});

const app: Application = express();
const PORT: number = 3002;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/api/v1/stats', (_, res: Response) => {
  try {
    if (currentTemp === undefined || currentHu === undefined) {
      res.status(500);
      res.json({
        error_message: "Valori non presenti"
      });
    } else {
      const stats: Stats = {
        currentDate,
        currentTemp,
        currentHu,
        story: {
          temps,
          hus,
          dates
        }
      }
      res.json(stats);
    }
  } catch (err) {
    res.status(500);
    res.json({
      error_message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})



import express, { Application, Response, NextFunction } from 'express';
import SerialPort from 'serialport';
import path from 'path';

import Stats from './stats';

const baudRate: number = 9600;
const comPort: string = 'Com5';

const NO_DATA = -9999

let stats: Stats = {
  currentTemp: NO_DATA,
  currentHu: NO_DATA,
  currentDate: new Date(),
  story: {
    temps: [],
    hus: [],
    dates: []
  }
};

const Readline = SerialPort.parsers.Readline;

try {
  const serialPort = new SerialPort(comPort, {
    baudRate
  });
  const parser = new Readline({ delimiter: '\n' });
  serialPort.pipe(parser);
  parser.on('data', (data: string) => {
    const [t, h]: Array<string> = data.split(':');
    stats.currentTemp = parseFloat(t);
    stats.currentHu = parseFloat(h);
    stats.currentDate = new Date();
    if (stats.story.temps.length > 19) {
      stats.story.temps.shift();
      stats.story.hus.shift();
      stats.story.dates.shift();
    }
    stats.story.temps.push(stats.currentTemp);
    stats.story.hus.push(stats.currentHu);
    stats.story.dates.push(stats.currentDate);

    console.log(`Temp: ${stats.currentTemp}, Hu: ${stats.currentHu}, Date: ${stats.currentDate.toLocaleTimeString()}`);
  });
} catch (err) {
  console.log(err.message);
}


const app: Application = express();
const PORT: number = 3002;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/api/v1/stats', (_, res: Response) => {
  try {
    if (stats.currentTemp === NO_DATA) {
      throw new Error('Data hasn\'t already been retrieved.');
    } else {
      res.json(stats);
    }
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
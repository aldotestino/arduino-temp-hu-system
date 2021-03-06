import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import SerialPort from 'serialport';
import userRoute from './routes/userController';
import {idExists} from './db/userService';
import Stats from './Stats';

const baudRate: number = 9600;
const comPort: string = '/dev/ttyACM0';
const MAX_STORY_LEN = 20;

let stats: Stats = {
  story: {
    temps: [],
    hus: [],
    dates: []
  }
}

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
    stats.story.temps.push(stats.currentTemp);
    stats.story.hus.push(stats.currentHu);
    stats.story.dates.push(stats.currentDate);
    if (stats.story.temps.length > MAX_STORY_LEN) {
      stats.story.temps.shift();
      stats.story.hus.shift();
      stats.story.dates.shift();
    }
  });
} catch (err) {
  console.log(err.message);
}

const app: Application = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoute);
app.get('/api/v1/stats', async (req: Request, res: Response) => {
  try {
    const userID = req.headers.user_access_id as string;
    const canAccess = await idExists(userID);
    if (!canAccess) {
      throw new Error('Invalid user Id!');
    }
    if (stats.currentTemp === undefined) {
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
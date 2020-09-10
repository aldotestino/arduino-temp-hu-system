import express, { Request, Response } from 'express';
import { register, login } from '../db/users';

const userRoute = express.Router();

userRoute.post('/register', async (req: Request, res: Response) => {
  try {
    const insertedUserId = await register(req.body);
    res.json(insertedUserId);
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

userRoute.post('/login', async (req: Request, res: Response) => {
  try {
    const loggedUserId = await login(req.body);
    res.json(loggedUserId);
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

export default userRoute;
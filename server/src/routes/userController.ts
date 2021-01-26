import express, { Request, Response } from 'express';
import { register, login } from '../db/userService';
import User from '../User';

const userRoute = express.Router();

userRoute.post('/register', async (req: Request, res: Response) => {
  try {
    const insertedUserId = await register(req.body as User);
    res.json(insertedUserId);
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

userRoute.post('/login', async (req: Request, res: Response) => {
  try {
    const loggedUserId = await login(req.body as User);
    res.json(loggedUserId);
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

export default userRoute;
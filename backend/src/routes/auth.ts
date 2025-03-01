import { Router } from 'express';
import { register, login } from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
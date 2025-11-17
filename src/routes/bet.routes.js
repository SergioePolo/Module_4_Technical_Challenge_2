import express from 'express';

import { createBet } from '../controllers/bet.controller.js';

export const betRouter = express.Router();

betRouter.post('/', createBet);
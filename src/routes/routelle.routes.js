import express from 'express';

import { createRoulette, getRoulettes, updateRoulette } from '../controllers/roulette.controller.js';

export const rouletteRouter = express.Router();

rouletteRouter.post('/', createRoulette);

rouletteRouter.get('/', getRoulettes);
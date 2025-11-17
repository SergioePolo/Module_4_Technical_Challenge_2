import express from 'express';

import { createRoulette, getRoulettes, openRoulette, closeRoulette } from '../controllers/roulette.controller.js';

export const rouletteRouter = express.Router();

rouletteRouter.post('/', createRoulette);

rouletteRouter.get('/', getRoulettes);

rouletteRouter.put('/:id/open', openRoulette);

rouletteRouter.put('/:id/close', closeRoulette);


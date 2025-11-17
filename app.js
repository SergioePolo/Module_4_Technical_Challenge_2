import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './src/config/db.js';
import { rouletteRouter } from './src/routes/routelle.routes.js';
import { betRouter } from './src/routes/bet.routes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/roulette', rouletteRouter);
app.use('/bet', betRouter);

const appPort = process.env.PORT;
dbConnection();

app.listen(appPort, ()=>{
    console.log('Server created in port ' + appPort);
})
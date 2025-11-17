import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './src/config/db.js';
import { rouletteRouter } from './src/routes/routelle.routes.js';

/* 
import { userRouter } from './routes/users.routes.js';
import { roleRouter } from './routes/roles.routes.js';
import { departmentRouter } from './routes/departments.routes.js'; */

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/roulette', rouletteRouter);
/* app.use('/users',userRouter);
app.use('/roles', roleRouter);
app.use('/departments', departmentRouter); */

const appPort = process.env.PORT;
dbConnection();

app.listen(appPort, ()=>{
    console.log('Server created in port ' + appPort);
})
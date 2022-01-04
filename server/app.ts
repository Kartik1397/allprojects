import express from 'express';
import cors from 'cors';
import * as http from 'http';
import bodyParser from 'body-parser';
import session from 'express-session'
import dotenv from 'dotenv';
import InitiateMongoServer from './config/initiateMongoServer';
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

//route Imports
import userRoutes from './Routes/UserRoutes';
import authRoutes from './Routes/AuthRoutes';
import Auth from './MiddleWare/Auth-MiddleWare';

const app: express.Application = express();
const server: http.Server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

declare var process: {
  env: {
    MONGO_URL: string,
    PORT: number,
  }
}

const port = process.env.PORT || 4000;

//Config for Environment variables
dotenv.config();

//Initiate Mongo Sever
InitiateMongoServer();

app.use(express.json());
//cross origin resource sharing :Set middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 60 * 12 * 3, path: '/' } }))
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("server is under development ...");
})

server.listen(port, () => {
  console.log('Server started at ' + port);
});

import express from 'express';
import cors from 'cors';
import * as http from 'http';
import bodyParser from 'body-parser';
import session, { MemoryStore } from 'express-session'
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
import projectRoutes from './Routes/ProjectRoutes';
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

const port = process.env.PORT || 80;

//Config for Environment variables
dotenv.config();

//Initiate Mongo Sever
InitiateMongoServer();

app.use(express.json());
//cross origin resource sharing :Set middleware

var whitelist = ['http://localhost:3000', 'https://allprojects.ml']
var corsOptions = {
  origin: ['http://localhost:3000', 'https://allprojects.ml'],
  credentials:true
}
app.use(cors(corsOptions))
app.use(session(
  { secret: "secret", store: new MemoryStore(), cookie:{maxAge: Date.now() + (30 * 86400 * 1000) 
  }
  }));
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/project',projectRoutes);
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("server is under development ...");
})

server.listen(port, () => {
  console.log('Server started at ' + port);
});

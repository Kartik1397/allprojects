import express from 'express';
import cors from 'cors';
import * as http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const InitiateMongoServer = require("./config/initiateMongoServer");
import dotenv from 'dotenv';
import fs from 'fs'

//route Imports
import userRoutes from './Routes/UserRoutes';
import authRoutes from './Routes/AuthRoutes';
import Auth from './MiddleWare/Auth-MiddleWare';

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./keys/public.key', 'utf8');

const app: express.Application = express();
const server: http.Server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


declare var process : {
    env: {
      MONGO_URL: string,
      PORT:number,
    }
  }
const port = process.env.PORT || 3001;



//Config for Environment variables
dotenv.config();

//Initiate Mongo Sever
InitiateMongoServer();

app.use(express.json());
app.use(cors());
  //cross origin resource sharing :Set middleware
app.use(cors({
  origin: "http://localhost:3000",
   credentials:true}))
   app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 *60 *12*3 ,path:'/'}}))
app.use('/user',userRoutes);
app.use('/auth',authRoutes);

app.get('/',Auth,(req: express.Request, res: express.Response)=>{
  // console.log(req.session.user);
  // console.log(req.session);
  res.status(200).send("server is under development ...");
})


server.listen(port, () => {
    console.log('Server started at ' + port);
});

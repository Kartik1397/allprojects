import express from 'express';
import cors from 'cors';
import * as http from 'http';

const InitiateMongoServer = require("./config/initiateMongoServer");
import dotenv from 'dotenv';
import fs from 'fs';




//route Imports
import userRoutes from './Routes/UserRoutes';
import authRoutes from './Routes/AuthRoutes';

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./keys/public.key', 'utf8');




const app: express.Application = express();
const server: http.Server = http.createServer(app);

declare var process : {
    env: {
      MONGO_URL: string,
      PORT:number,
    }
  }
const port = process.env.PORT || 80;



//Config for Environment variables
dotenv.config();

//Initiate Mongo Sever
InitiateMongoServer();

app.use(express.json());
app.use(cors());
  //cross origin resource sharing :Set middleware
app.use(cors({origin: "https://allprojects.ml"}))

app.use('/user',userRoutes);
app.use('/auth',authRoutes);
app.get('/',(req: express.Request, res: express.Response)=>{
    res.status(200).send("server is under development ...");
})


 
server.listen(port, () => {
    console.log('Server started at ' + port);
});

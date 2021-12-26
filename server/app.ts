import express from 'express';
import cors from 'cors';
import * as http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//route Imports
const userRoutes = require('./Routes/UserRoutes');

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


//Mongoose Configurations
mongoose.set("debug",true);
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use(cors());

mongoose.connect(
    process.env.MONGO_URL,
    () => {
      console.log(process.env.MONGO_URL);
      console.log("Connected to MongoDB");
    }
  );



  //cross origin resource sharing :Set middleware
app.use(cors({origin: "https://allprojects.ml"}))

app.use('/user',userRoutes);

app.get('/',(req: express.Request, res: express.Response)=>{
    res.status(200).send("server is under development ...");
})

server.listen(port, () => {
    console.log('Server started at ' + port);
});

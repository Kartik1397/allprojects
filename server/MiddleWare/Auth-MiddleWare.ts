import express from 'express';

import User from '../models/User';
const app: express.Application = express();

const Auth = async  (req:express.Request, res:express.Response, next:express.NextFunction) => {
  try{
  // console.log(req.session,"In middleware");
  if(typeof req.session.user !== "undefined" || req.session.user === true){
    console.log("if part");
 
    req.user = req.session.user;
   console.log(req.user);
    
  }
 
  next(req.user);


  }
  catch(e){
    console.log(e);
    res.status(400).json({msg:"Authentication failed2"});
  }
}
export default Auth;
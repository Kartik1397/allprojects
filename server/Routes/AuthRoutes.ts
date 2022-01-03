import express from 'express';
import session from 'express-session';
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import {  OAuth2Client } from 'google-auth-library';
import Auth from '../MiddleWare/Auth-MiddleWare';
const client = new OAuth2Client(process.env.CLIENT_ID)

import User from "../models/User";
// import { IUser } from '../Interfaces/user';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const app: express.Application = express();

declare global {
  namespace Express {
    interface Session {
      user:{ [key:string]: any}
    }
    interface Request{
      user: { [key: string]: any }
    }
  }
}

// app.use(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
//   try{
//     const user = await User.findOne({id:req.session.id});
  
//     req.user =  {email:user?.email ,uname:user?.uname};


//     next()
//   }
//   catch(e){
//     res.status(400).json({msg:"failed"});
//   }
// })
//get me 
app.post("/me",Auth, function (req:express.Request,res:express.Response,user:any){
  console.log("In me");
  console.log(req.user);
  console.log(req.session,"Session");
  res.status(200);

  res.json({msg:"success",user:user});
})
//logout
app.delete("/api/v1/auth/logout",Auth,async function (req, res) {
    req.session.destroy(() => {
      res.json({
        message: "Logged out successfully"
      });
    });

  })
//login
app.post('/api/google',async (req: express.Request, res: express.Response)=>{
  try{
 
      const { credential }  = req.body
      const ticket = await client.verifyIdToken({
          idToken: credential,
          audience: process.env.CLIENT_ID
      })
      const obj:any = ticket.getPayload();    
      const newUser = new User({
        uname:obj.name,
        email:obj.email
      });

      const foundUser = await User.findOne({email:obj.email});
      if(!foundUser){
        const user =await User.create(newUser);
        req.session.user = user;
        console.log("hi1");
        res.status(302);
        res.redirect('http://localhost:3000');
      }
      else{
        // const user =await User.create(newUser);
        req.session.user = foundUser;
        console.log("hi");
        res.status(302);
        res.redirect('http://localhost:3000');
      }
  
 
  } catch(e) {
    res.status(400);
    if (e instanceof Error) {
      res.json({msg:"failed to auth the user", error:e.message});
    }
  }

})

export default app;
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  session from 'express-session'
import {  OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.CLIENT_ID)

import User from "../models/User";
import { IUser } from '../Interfaces/user';


const app: express.Application = express();
declare global {
  namespace Express {
    interface Session {
      _user?:IUser
    }
    interface Request{
      user: Partial<IUser>
    }
  }
}


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 *60 *12*3}}))



app.use(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  try{
    const user = await User.findOne({id:req.session.id});
  
    req.user =  {email:user?.email ,uname:user?.uname};


    next()
  }
  catch(e){
    res.status(400).json({msg:"failed"});
  }
})

//logout
app.delete("/api/v1/auth/logout",async (req, res) => {
  req.session.destroy(()=>{
    res.json({
      message: "Logged out successfully"
  })
  });
 
})
//login
app.post('/api/google',async (req: express.Request, res: express.Response)=>{
  try{
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })
    const obj:any = ticket.getPayload();    
    const newUser = new User({
      uname:obj.name,
      email:obj.email
    });
    const user =await User.create(newUser);
    req.session.id = user.id;
    res.status(201);
    res.json(user);
  }catch(e){
    res.status(400);
    res.json({msg:"failed to auth the user"});
  }

})

export default app;
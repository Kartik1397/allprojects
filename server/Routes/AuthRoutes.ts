import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import Auth from '../MiddleWare/Auth-MiddleWare';
const client = new OAuth2Client(process.env.CLIENT_ID)

import User from "../models/User";
// import { IUser } from '../Interfaces/user';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const router: express.Router = express.Router();

declare global {
  namespace Express {
    interface Session {
      user: { [key: string]: any }
    }
    interface Request {
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
router.get("/me", Auth, function (req: express.Request, res: express.Response) {
  
  console.log("Hi");

  res.status(200);
  res.json({ msg: "success", user: req.user,isAuthenticated:true });
})

//logout
router.delete("/api/v1/logout", async function (req, res) {
  // console.log("In logout",req.cookies);
  try{
    req.session.destroy(() => {
      res.status(201);
      res.json({
        message: "Logged out successfully",isAuthenticated:false
      });
    });
  }
  catch(e){
    res.json({message:"couldn't log out",isAuthenticated:true});
  }
 
})

//login
router.post('/api/google', async (req: express.Request, res: express.Response) => {
  try {
    const { credential } = req.body
    console.log("I am here",credential);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.CLIENT_ID
    })
    const obj: any = ticket.getPayload();
    const newUser = new User({
      uname: obj.name,
      email: obj.email,
      image:obj.picture
    });

    const foundUser = await User.findOne({ email: obj.email });
    if (!foundUser) {
      const user = await User.create(newUser);
      req.session.user = user;
      const origin :any= req.get('origin');
   
      res.redirect(301, origin);
    } else {
      req.session.user = foundUser;
      const origin:any = req.get('origin');
    
      res.redirect(301,origin);
    }
  } catch (e) {
    res.status(400);
    if (e instanceof Error) {
      res.json({ msg: "failed to auth the user", error: e.message });
    }
  }
})

export default router;
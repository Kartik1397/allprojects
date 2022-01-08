import express from 'express';

import User from '../models/User';
const app: express.Application = express();

const Auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (typeof req.session.user !== "undefined" || req.session.user === true) {
      req.user = req.session.user;
    }
    else{
      throw "Authentication failed";
    }
    next();
  }
  catch (e) {
    res.status(400).json({ msg: "Authentication failed2" });
  }
}
export default Auth;
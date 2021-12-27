import {NextFunction, Request,Response} from 'express';
const jwt = require("jsonwebtoken");
import { IncomingHttpHeaders } from 'http';
interface CustomRequest extends Request {
  myAwesomeProperty?: number
  headers           : IncomingHttpHeaders & {
    customHeader?: string
  }
}

module.exports = (req:CustomRequest, res:Response, next:NextFunction) => {
  try {
     
    const token = req.headers['customHeader'];
    console.log(token);
    const decodedToken = jwt.verify(token, "");
    console.log(decodedToken);
    const email = decodedToken.email;
    if (req.body.email && req.body.email !== email) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch(e) {
      console.log(e);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
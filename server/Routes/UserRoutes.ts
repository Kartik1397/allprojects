import express from 'express';
import Auth from '../MiddleWare/Auth-MiddleWare';
const User = require("../models/User");
const app: express.Application = express();


//Call : Method:GET
//api-call : server-host/user/all
app.get('/all',Auth,async (req: express.Request, res: express.Response) => {
 console.log(req.session);
  const users = await User.find({});

  res.status(200).send(JSON.stringify(users));

})

export default app;
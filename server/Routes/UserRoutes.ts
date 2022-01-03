import express from 'express';
import Auth from '../MiddleWare/Auth-MiddleWare';
const User = require("../models/User");
const router: express.Router = express.Router();

//Call : Method:GET
//api-call : server-host/user/all
router.get('/all', Auth, async (req: express.Request, res: express.Response) => {
  const users = await User.find({});
  res.status(200).send(JSON.stringify(users));
})

export default router;
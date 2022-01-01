import express from 'express';
const User = require("../models/User");
const app: express.Application = express();


//Call : Method:GET
//api-call : server-host/user/all
app.get('/all',async (req: express.Request, res: express.Response) => {
 
  const users = await User.find({});

  res.status(200).send(JSON.stringify(users));

})

export default app;
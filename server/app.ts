import express from 'express';
import cors from 'cors';
import * as http from 'http';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://deep:deep2000@cluster0.habkm.mongodb.net';
const client = new MongoClient(url);

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());

app.get('/', async (req: express.Request, res: express.Response) => {
    await client.connect();
    const db = client.db('allprojects');
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
    res.status(200).send(JSON.stringify(users));
    client.close();
});

server.listen(port, () => {
    console.log('Server started at ' + port);
});

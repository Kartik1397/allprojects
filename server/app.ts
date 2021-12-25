import express from 'express';
import cors from 'cors';
import * as http from 'http';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('running');
});

server.listen(port, () => {
    console.log('Server started at ' + port);
});

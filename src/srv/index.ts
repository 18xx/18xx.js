import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import * as express from 'express';
import * as redis from 'redis';

import DynamoDBStore from '../store/dynamodb';
import MemoryStore from '../store/memory_store';

import { Store } from '../store';

const app: express.Express = express();
app.use(express.static('dist'));
app.use(bodyParser.json());

let dataStore: Store;
switch (process.env.DATA_STORE_TYPE) {
  case 'dynamodb':
    console.info(`Using DynamoDB Store ${process.env.DATA_STORE_URL}`);
    dataStore = new DynamoDBStore(process.env.DATA_STORE_URL);
    break;
  default:
    console.info('Using in memory store');
    dataStore = new MemoryStore();
}

const html: Function = (game: string, initialState?: string) => `
<html>
<head>
  <link rel='stylesheet' type='text/css' href='/styles.css'>
  <div id='container'
    data-game-name='${game}'
    data-initial-state-id='${initialState}'>
  </div>
  <script src="/build.js"></script>
</head>
<body></body>
</html>
`;

app.get('/maps/:game', (req, res) => {
  res.send(html(req.params.game));
});

app.get('/maps/:game/:state', (req, res) => {
  res.send(html(req.params.game, req.params.state));
});

app.get('/state/:state', (req, res) => {
  dataStore.getState(req.params.state).then(result => {
    res.json(result);
  }).catch((reply: string) => {
    console.error('Error getting state:', reply);
    res.status(500);
  });
});

app.post('/update', (req, res) => {
  const jsonBody: string = JSON.stringify(req.body);
  const hash: string = crypto.createHash('md5').update(jsonBody).digest('hex');

  dataStore.setState(hash, req.body).then(
    () => res.send(true)
  ).catch((reply: string) => {
    console.error('Error setting state:', reply);
    res.status(500);
  });
});

app.get('/tiles', (req, res) => {
  res.send(html(null));
});

const port: number = process.env.PORT || 3002;
console.info(`Listening on 0.0.0.0:${port}`);
app.listen(port);

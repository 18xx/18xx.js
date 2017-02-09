import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import * as express from 'express';
import * as redis from 'redis';

const app: express.Express = express();
app.use(express.static('dist'));
app.use(bodyParser.json());

let store: Map<string, string>;
store = new Map();
// store = redis.createClient();

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
  const reply: string = store.get(req.params.state);
  res.json(JSON.parse(reply));
  /*
  store.get(req.params.state, (err: any, reply: any) => {
    res.json(JSON.parse(reply));
  });
  */
});

app.post('/update', (req, res) => {
  const jsonBody: string = JSON.stringify(req.body);
  const hash: string = crypto.createHash('md5').update(jsonBody).digest('hex');
  store.set(hash, jsonBody);
  res.send(true);
});

app.listen(3002);

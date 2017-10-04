import * as bodyParser from 'body-parser';
import cookieSession = require('cookie-session');
import * as crypto from 'crypto';
import * as express from 'express';
import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';

import DynamoDBStore from '../store/dynamodb';
import MemoryStore from '../store/memory_store';

import { Store } from '../store';

import * as manifest from '../../dist/manifest.json';

const cookieSecret: string = process.env.COOKIE_SECRET;

const app: express.Express = express();
app.use(express.static('dist'));
app.use(cookieSession({
  keys: [cookieSecret],
  name: 'cs',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.set('view engine', 'ejs');

if (process.env.GOOGLE_OAUTH2_CALLBACK) {
  passport.use(
    new OAuth2Strategy({
      callbackURL: process.env.GOOGLE_OAUTH2_CALLBACK,
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  ));
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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

app.get('/', (req, res) => {
  res.send(req.session);
});

app.post('/login',
  passport.authenticate(
    'local',
    {
      failureRedirect: '/login',
      successRedirect: '/',
    },
  )
);

app.get('/maps/:game', (req, res) => {
  res.render('layout', {
    game: req.params.game,
    initialState: 'undefined',
    manifest,
    session: req.session,
    title: req.params.game,
  });
});

app.get('/maps/:game/:state', (req, res) => {
  res.render('layout', {
    game: req.params.game,
    initialState: req.params.state,
    manifest,
    session: req.session,
    title: req.params.game,
  });
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
  const json: string = JSON.stringify({
    ...req.body,
    history: undefined,
  });
  const hash: string = crypto.createHash('sha256').update(json).digest('hex');

  dataStore.setState(hash, req.body).then(
    () => res.send(true)
  ).catch((reply: string) => {
    console.error('Error setting state:', reply);
    res.status(500);
  });
});

app.get('/tiles', (req, res) => {
  res.render('layout', {
    game: 'tiles',
    initialState: 'undefined',
    manifest,
    session: req.session,
    title: 'All Tiles',
  });
});

app.get('/login', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google',
  passport.authenticate(
    'google',
    {
      scope: ['https://www.googleapis.com/auth/plus.login']
    },
  )
);

app.get('/auth/google/callback',
  passport.authenticate(
    'google',
    {
      failureRedirect: '/login'
    },
  ),
  (req, res) => {
    res.redirect('/');
  }
);

const port: number = process.env.PORT || 3002;
console.info(`Listening on 0.0.0.0:${port}`);
app.listen(port);

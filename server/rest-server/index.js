const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./routes');
const port = 3000;
const request = require('request');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
require('babel-register');
require('babel-polyfill');

const keys = require('./../environment/keys');

require('../database/config/index');

// body-parser
app.use(
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// encrypt session info
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initilize passport
app.use(passport.initialize());
app.use(passport.session());

// serve static assets
app.use(express.static(path.join(__dirname, '../../spotifight-ui/public/')));

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(router);

app.use('*', (err, res) => {
  res.sendFile(
    path.resolve(__dirname, './../../spotifight-ui/public', 'index.html')
  );
});

app.listen(port, () => console.log(`server listening on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./routes');
const passport = require('passport');
const port = 3000;
require('babel-register');
require('babel-polyfill');

require('../database/config/index');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../spotifight-ui/public/')));

// app.get('/auth/google', passport.authenticate('google'), (req, res) => {
//   // `req.user` contains the authenticated user.
//   res.redirect(`/redirect/${req.user.username}`);
// });

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

app.use(router);

app.use('*', (err, res) => {
  res.sendFile(
    path.resolve(__dirname, './../../spotifight-ui/public', 'index.html')
  );
});

app.listen(port, () => console.log(`server listening on port ${port}`));

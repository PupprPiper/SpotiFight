const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
const router = require('./routes')
const port = 3000
require('babel-register')
require('babel-polyfill')

require('../database/config/index')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "../../spotifight-ui/public/")))

app.use(router);

app.use('*', (err, res) => {
  res.sendFile(path.resolve(__dirname, './../../spotifight-ui/public', 'index.html'));
})



app.listen(port, () => console.log(`server listening on port ${port}`))
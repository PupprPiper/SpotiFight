var request = require('request'); // "Request" library

var client_id = '557cbbb0600048049128711433d8ccaa'; // Your client id
var client_secret = 'c82d25a351f04d158ee46fd6f5106838'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};



const getAccessToken = (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
      var token = body.access_token;
  
      console.log('this is the body', body.access_token)
      res.send(token)
    }
  });
}

module.exports.getAccessToken = getAccessToken
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

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;

    console.log('this is the body', body.access_token)
    // var options = {
    //   url: 'https://api.spotify.com/v1/users/jmperezperez',
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   },
    //   json: true
    // };
    // request.get(options, function(error, response, body) {
    //   console.log(body);
    // });
  }
});
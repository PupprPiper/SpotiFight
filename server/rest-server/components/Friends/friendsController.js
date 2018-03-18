const helpers = require('./friendsSQLHelpers');
const db = require('../../../database/config')

module.exports = {
  addFriend: (req, res) => {
    console.log(req.url)
    var queryString = helpers.addFriendHelper(req);
    db.queryAsync(queryString)
    res.send("add friend received");
  },
  deleteFriend: (req, res) => {
    var queryString = helpers.deleteFriendHelper(req);
    db.queryAsync(queryString)
    res.send("delete friend received");
  },
  fetchAllFriends: (req, res) => {
    var queryString = helpers.fetchAllFriendsHelper(req);
    db.queryAsync(queryString)
    res.send('fetch all friends received')
  }
};

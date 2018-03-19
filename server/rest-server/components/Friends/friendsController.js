const helpers = require('./friendsSQLHelpers');
const db = require('../../../database/config')

module.exports = {
  addFriend: async (req, res) => {
    var queryString = helpers.addFriendHelper(req);
    var data = await db.queryAsync(queryString)
    res.send("add friend received");
  },
  deleteFriend: async (req, res) => {
    var queryString = helpers.deleteFriendHelper(req);
    var data = await db.queryAsync(queryString)
    res.send("delete friend received");
  },
  fetchAllFriends: async (req, res) => {
    var queryString = helpers.fetchAllFriendsHelper(req);
    var data = await db.queryAsync(queryString)
    res.send(data.rows)
  }
};

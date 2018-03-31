const helpers = require('./friendsSQLHelpers');
const db = require('../../../database/config')

module.exports = {
  requestFriend: async (req, res) => {
    var queryString = helpers.requestFriendHelper(req);
    var data = await db.queryAsync(queryString)
    res.send("friend request received");
  },
  deleteFriend: async (req, res) => {
    var queryString = helpers.deleteFriendHelper(req);
    var data = await db.queryAsync(queryString)
    res.send("delete friend received");
  },
  fetchAllFriends: async (req, res) => {
    var queryString = helpers.fetchAllFriendsHelper(req);
    var data = await db.queryAsync(queryString);
    res.send(data.rows)
  },
  fetchAllPendingFriends: async (req, res) => {
    var queryString = helpers.fetchAllPendingFriendsHelper(req);
    var data = await db.queryAsync(queryString);
    res.send(data.rows)
  },
  acceptFriend: async (req, res) => {
    var queryString = helpers.acceptFriendHelper(req);
    var data = await db.queryAsync(queryString)
    res.send("accepted friend request");
  },
}
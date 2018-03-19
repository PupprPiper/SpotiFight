const helpers = require('./friendsSQLHelpers');
const db = require('../../../database/config')

module.exports = {
  addUser: async(req, res) => {
    var queryString = helpers.addUserHelper(req);
    var data = await db.queryAsync(queryString);
    res.send('add user received')
  },
  fetchAllUsers: async(req, res) => {
    var queryString = helpers.fetchAllUsersHelper(req);
    var data = await db.queryAsync(queryString);
    res.send('add user received')
  }
}
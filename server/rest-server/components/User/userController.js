const helpers = require('./userSQLHelpers');
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
  },
  getOneUser: async(req, res)=> {
    var queryString = helpers.getOneUser(req.params.email);
    var data = await db.query(queryString);
    res.status(200).send(data.rows[0]);
  }
}
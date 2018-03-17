module.exports = {
  addFriend: (req, res) => {
    res.send("add friend received");
  },
  deleteFriend: (req, res) => {
    res.send("delete friend received");
  },
  fetchAllFriends: (req, res) => {
    res.send('fetch all friends received')
  }
};

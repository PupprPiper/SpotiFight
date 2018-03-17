module.exports  = {
  addFriendHelper: (req) => {
    return `
      INSERT INTO friends (user_id, friend_id)
      VALUES (${req.body.user_id}, ${req.body.friend_id}), 
      (${req.body.friend_id}, ${req.body.user_id})
      RETURNING id, user_id, friend_id
    `
  },

  deleteFriendHelper: (req) => {
    return `
    DELETE FROM friends
    WHERE (user_id=${req.body.user_id} AND friend_id=${req.body.friend_id}) OR 
    (user_id=${req.body.friend_id} AND friend_id=${req.body.user_id})
    RETURNING id, user_id, friend_id
  `
  }

}
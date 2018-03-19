module.exports  = {
  addUserHelper: (req) => {
    return `
      INSERT INTO friends (user_id, friend_id)
      VALUES (${req.body.user_id}, ${req.body.friend_id}), 
      (${req.body.friend_id}, ${req.body.user_id})
      RETURNING id, user_id, friend_id
    `
  },
  fetchAllUsersHelper: (req) => {
    return `
      INSERT INTO friends (user_id, friend_id)
      VALUES (${req.body.user_id}, ${req.body.friend_id}), 
      (${req.body.friend_id}, ${req.body.user_id})
      RETURNING id, user_id, friend_id
    `
  },


}
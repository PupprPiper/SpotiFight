module.exports  = {
  requestFriendHelper: (req) => {
    return `
      INSERT INTO friends (user_id, friend_id)
      VALUES (${req.body.friend_id}, ${req.body.user_id})
      RETURNING id, user_id, friend_id
    `
  },

  deleteFriendHelper: (req) => {
    return `
    DELETE FROM friends
    WHERE (user_id=${req.body.user_id} AND friend_id=${req.body.friend_id}) OR 
    (user_id=${req.body.friend_id} AND friend_id=${req.body.user_id})
    RETURNING id, user_id, friend_id;
    UPDATE users SET friends = friends - 1 where id = ${req.body.user_id} OR id = ${req.body.friend_id}
  `
  },
  
  fetchAllFriendsHelper:  (req) => {
    return `
      SELECT u.id, u.username, u.wins, u.losses
      FROM users AS u
        INNER JOIN friends AS f
        ON (u.id = f.friend_id)
        WHERE f.user_id=${req.params.user_id}
        AND f.pending = FALSE
    `
  },
  fetchAllPendingFriendsHelper: (req) => {
    console.log('USER ID HERE ', req.params.user_id)
    return `
      SELECT u.id, u.username, u.wins, u.losses
      FROM users AS u
        INNER JOIN friends AS f
        ON (u.id = f.friend_id)
        WHERE f.user_id=${req.params.user_id}
        AND f.pending = TRUE
    `
  },
  acceptFriendHelper: (req) => {
    return `
      INSERT INTO friends (user_id, friend_id, pending)
      VALUES (${req.body.user_id}, ${req.body.friend_id}, FALSE), (${req.body.friend_id}, ${req.body.user_id}, FALSE)
      ON CONFLICT (user_id, friend_id) DO UPDATE SET PENDING = FALSE;
      UPDATE users SET friends = friends + 1 where id = ${req.body.user_id} OR id = ${req.body.friend_id}
    `
  }

}

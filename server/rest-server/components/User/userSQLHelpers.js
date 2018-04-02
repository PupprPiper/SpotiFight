module.exports = {
  addUserHelper: req => {
    return `
      INSERT INTO users (email, username, status, avatar_url, wins, losses)
      VALUES (${req.body.email}, ${req.body.username}, ${req.body.status}, 
      ${req.body.avatar_url}, ${req.body.wins}, ${req.body.losses})
      RETURNING id, email, username, status, avatar_url, wins, losses
    `;
  },
  fetchAllUsersHelper: req => {
    return `
      SELECT id, email, username, status, avatar_url, wins, losses
      FROM users
    `;
  },
  getOneUser: email => {
    return `SELECT * FROM users WHERE email = '${email}';`;
  },
  addWinLossHelper: req => {
    return `
      UPDATE users SET ${req.body.field} = ${req.body.field} + 1 where id = ${req.body.user_id}
    `
  },
  updateInfoHelper: req => {
    return `
      UPDATE users SET ${req.body.field} = '${req.body.info}' where id = ${req.body.user_id}
    `
  }
};

const googleLoginHelper = (email, username) => {
  return `
    INSERT INTO users (email, username, wins, losses)
    VALUES ('${email}', '${username}', 0, 0)
    RETURNING id, email
  `;
};

module.exports = { googleLoginHelper };
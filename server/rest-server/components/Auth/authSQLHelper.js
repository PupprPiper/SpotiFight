const googleLoginHelper = ({ email, username, password }) => {
  return `
    INSERT INTO users (email, username, password, wins, losses)
    VALUES ('${email}', '${username}', '${password}', 0, 0)
    RETURNING id, email
  `;
};

module.exports = { googleLoginHelper };
const googleLoginHelper = (email, username, avatarUrl) => {
  return `
    INSERT INTO users (email, username, avatar_url, wins, losses)
    VALUES ('${email}', '${username}', '${avatarUrl}',0, 0)
    RETURNING id, email
  `;
};

module.exports = { googleLoginHelper };

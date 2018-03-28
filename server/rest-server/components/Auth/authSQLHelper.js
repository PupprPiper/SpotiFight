const googleLoginHelper = (email, username, avatarUrl) => {
  return `
    INSERT INTO users (email, username, avatar_url, wins, losses)
    VALUES ('${email}', '${username}', '${avatarUrl}',0, 0)
    RETURNING id, email
  `
};
const vanillaSignUpHelper = (email, password, username) => {
  return `
    INSERT INTO users (email, password, username, wins, losses)
    VALUES ('${email}', '${password}', '${username}', 0, 0)
    RETURNING id, email
  `
};


const validateUser = (email) => {
 return
 `SELECT username from users WHERE email = '${email}'`
}

module.exports = { googleLoginHelper, validateUser, vanillaSignUpHelper };

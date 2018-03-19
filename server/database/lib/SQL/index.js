const db = require("../../config/index");

module.exports = {
  createDatabase: async () => {
    try {
      await db.queryAsync(`CREATE DATABASE spotifight`);
      console.log("successfully started database");
    } catch (err) {
      console.log("createdatabase did not work");
    }
  },

  dropDatabase: async () => {
    try {
      await db.queryAsync(`DROP DATABASE IF EXISTS spotifight`);
      console.log("successfully dropped database");
    } catch (err) {
      console.log("drop database did not work");
    }
  },

  useDatabase: async () => {
    try {
      await db.queryAsync(`USE IF EXISTS SPOTIFIGHT`);
      console.log("YOU ARE USING SPOTIFIGHT DATABASE");
    } catch (err) {
      console.log("you are not using database");
    }
  },

  createUserTable: async () => {
    try {
      await db.queryAsync(
        `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      wins INT NOT NULL,
      losses INT NOT NULL,
      CONSTRAINT users_pk
        PRIMARY KEY(id)
      )
      `
      );
      console.log("you created a usertable!");
    } catch (err) {
      console.log("you did not create a usertable", err);
    }
  },

  createFriendsTable: async () => {
    try {
      await db.queryAsync(
        `
    CREATE TABLE IF NOT EXISTS friends
    (
      id SERIAL,
      user_id INT NOT NULL,
      friend_id INT NOT NULL,
      CONSTRAINT friends_pk
      PRIMARY KEY(id),
      CONSTRAINT fk_friends_user_id
      FOREIGN KEY(user_id) REFERENCES users(id),
      CONSTRAINT fk_friends_friend_id
      FOREIGN KEY(friend_id) REFERENCES users(id)
    )
    `
      );
      console.log("you created a friends table!");
    } catch (err) {
      console.log("you did not create a friends table", err);
    }
  }
};

const db = require("../../config/index");

module.exports = {
  createDatabase: async () => {
    try {
      await db.queryAsync(`CREATE DATABASE spotifight`);
      console.log("successfully created database");
    } catch (err) {
      console.log("error creating database ", err);
    }
  },

  dropDatabase: async () => {
    try {
      await db.queryAsync(`DROP DATABASE IF EXISTS spotifight`);
      console.log("successfully dropped database");
    } catch (err) {
      console.log("error dropping database ", err);
    }
  },

  useDatabase: async () => {
    try {
      await db.queryAsync(`USE IF EXISTS SPOTIFIGHT`);
      console.log("YOU ARE USING SPOTIFIGHT DATABASE");
    } catch (err) {
      console.log("error using database ", err);
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
      status VARCHAR(140),
      avatar_url TEXT,
      wins INT NOT NULL,
      losses INT NOT NULL,
      CONSTRAINT users_pk
      PRIMARY KEY(id)
      )
      `
      );
      console.log("you created a usertable!");
    } catch (err) {
      console.log("error creating user table", err);
    }
  },
  dropUserTable: async () => {
    try {
      await db.queryAsync(
        `DROP TABLE IF EXISTS users`
      );
    } catch (err) {
      console.log('error dropping users table ', err)
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
  },
  dropFriendsTable: async () => {
    try{
      await db.queryAsync(
        `DROP TABLE IF EXISTS friends`
      )
    } catch(err){
      console.log('error dropping friends table ', error)
    }
  },
  createFavoriteSongsTable: async () => {
    try {
      await db.queryAsync(
        `
    CREATE TABLE IF NOT EXISTS favorite_songs
    (
      id SERIAL,
      song_name VARCHAR(100),
      user_id INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
    `
      );
      console.log("you created a friends table!");
    } catch (err) {
      console.log("you did not create a friends table", err);
    }
  },
  dropFavoriteSongsTable: async () => {
    try{
      await db.queryAsync(
        `DROP TABLE IF EXISTS favorite_songs`
      )
    } catch(err){
      console.log('error dropping favorite_songs table ', err)
    }
  },
  createHistoryTable: async () => {
    try {
      await db.queryAsync(
        `
    CREATE TABLE IF NOT EXISTS history
    (
      id SERIAL,
      song_name VARCHAR(100),
      user_id INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
    `
      );
      console.log("you created a friends table!");
    } catch (err) {
      console.log("you did not create a friends table", err);
    }
  }
};

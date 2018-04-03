const pg = require('pg');
const Promise = require('bluebird')

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'spotifight',
  password: '123',
  port: 5432,
  max: 20
}

const db = new pg.Pool(config);

db.on('connect', () => {
  console.log('successfully connected to pg', config.database);
});

// db.on('remove', (err) => {
//   console.log('error in remove ', err);
// });

db.on('error', (err) => {
  console.log('error in pg ', err);
});

db.connect();

Promise.promisifyAll(db)

module.exports = db
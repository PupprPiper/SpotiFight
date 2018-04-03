const queries = require('../lib/SQL/index')

const setup = async () => {
  // await queries.dropDatabase()
  // await queries.createDatabase()
  // await queries.useDatabase()
  await queries.dropTables()
  await queries.createUserTable()
  await queries.createFriendsTable()
  await queries.createFavoriteSongsTable()
  process.exit()
}

setup()
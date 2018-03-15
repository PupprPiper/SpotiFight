const queries = require('../lib/SQL/index')

const setup = async () => {
  // await queries.dropDatabase()
  // await queries.createDatabase()
  // await queries.useDatabase()
  await queries.createUserTable()
  process.exit()
}

setup()
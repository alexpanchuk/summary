import { connect, dropDb, close } from "./mongo"

async function dropDatabase() {
  await connect()
  await dropDb()
  await close()
}

dropDatabase()

import { connect, dropDb, close } from "./mongo"

async function dropDatabase() {
  await connect()
  dropDb()
  close()
}

dropDatabase()

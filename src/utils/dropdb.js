import { connect, dropDb, close } from "./mongo/index"

async function dropDatabase() {
  await connect()
  dropDb()
  close()
}

dropDatabase()

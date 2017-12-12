import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"

async function dropDb() {
  const mongoConnection = await mongooseConnector(MONGO_URI)
  await mongoConnection.dropDatabase()
  console.log("Mongo dropped")
  mongoConnection.close()
}

dropDb()

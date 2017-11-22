import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"

async function dropDb() {
  const mongoConnection = await mongooseConnector(MONGO_URI)
  await mongoConnection.dropDatabase(error => {
    if (error) {
      console.log(error)
    }

    console.log("Database was dropped succesfully")

    mongoConnection.close()
  })
}

dropDb()

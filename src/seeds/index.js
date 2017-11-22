import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"
import userSeeds from "./user-seeds"

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI)

  await mongoConnection.dropDatabase()

  const users = await userSeeds()

  console.log(users)

  mongoConnection.close()
}

initSeeds()

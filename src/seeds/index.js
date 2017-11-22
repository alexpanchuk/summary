import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI)

  mongoConnection.close()
}

initSeeds()

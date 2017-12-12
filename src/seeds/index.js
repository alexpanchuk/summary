import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"
import userSeed from "./user-seeds"
import summarySeed from "./summary-seeds"

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI)

  await mongoConnection.dropDatabase()

  try {
    const users = await userSeed(500)
    const summaries = await summarySeed(500, users)

    console.log(summaries[499])
  } catch (error) {
    console.log(error)
  } finally {
    mongoConnection.close()
  }
}

initSeeds()

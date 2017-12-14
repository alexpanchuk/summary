import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"
import userSeed from "./user-seeds"
import summarySeed from "./summary-seeds"

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI)

  await mongoConnection.dropDatabase()

  try {
    const users = await userSeed(100)
    const summaries = await summarySeed(100, users)

    console.log(summaries[99])
  } catch (error) {
    console.log(error)
  } finally {
    mongoConnection.close()
  }
}

initSeeds()

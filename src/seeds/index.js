import { MONGO_URI } from "../config"
import mongooseConnector from "../connectors/mongoose-connector"
import userSeed from "./user-seeds"
import summarySeed from "./summary-seeds"

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI)

  await mongoConnection.dropDatabase()

  const users = await userSeed(10)
  const summaries = await summarySeed(10, users)

  console.log(users)
  console.log("=".repeat(50))
  console.log(summaries)

  mongoConnection.close()
}

initSeeds()

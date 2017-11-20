import config from "config"
import dotenv from "dotenv"
import envs from "./constants/envs"
import env from "./utils/env"

dotenv.config()

if (!envs[env]) {
  throw new Error(`Unknown env "${env}"`)
}

const PORT = process.env.PORT || config.get("port")
const MONGO_URI = process.env.MONGO_URI || config.get("mongo.uri")

export { PORT, MONGO_URI }

import mongoose from "mongoose"
import { IS_DEV } from "../utils/env"

mongoose.Promise = Promise

if (IS_DEV) {
  mongoose.set("debug", true)
}

export default mongoUri => {
  if (!mongoUri) {
    throw new Error("Mongo URI is not defined")
  }

  return mongoose.connect(mongoUri, { useMongoClient: true }, () => {
    if (IS_DEV) {
      console.log("Mongo connected")
    }
  })
}

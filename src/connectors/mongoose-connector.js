import mongoose from "mongoose"

mongoose.Promise = Promise

export default (mongoUri, cb) => {
  if (!mongoUri) {
    throw new Error("Mongo URI is not defined")
  }

  return mongoose.connect(mongoUri, { useMongoClient: true }, cb)
}

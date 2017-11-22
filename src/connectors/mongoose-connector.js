import mongoose from "mongoose"

mongoose.Promise = Promise

export default mongoUri => {
  if (!mongoUri) {
    throw new Error("Mongo URI is not defined")
  }

  return mongoose.connect(mongoUri, { useMongoClient: true }).then(() => {
    console.log("Mongo connected")
  })
}

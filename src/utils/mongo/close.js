import mongoose from "mongoose"

export default () =>
  mongoose.connection.close(() => console.log("Connection close"))

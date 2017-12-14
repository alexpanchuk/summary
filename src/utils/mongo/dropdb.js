import mongoose from "mongoose"

export default cb => mongoose.connection.db.dropDatabase(cb)

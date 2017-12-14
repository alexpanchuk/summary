import mongoose from "mongoose"

export default cb => mongoose.connection.close(cb)

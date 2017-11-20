import { MONGO_URI } from "../config"
import mongooseConnector from "./mongoose-connector"

function initConnectors() {
  mongooseConnector(MONGO_URI)
}

export { mongooseConnector }
export default initConnectors

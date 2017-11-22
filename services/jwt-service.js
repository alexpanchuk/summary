import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../src/config"

export default {
  genToken(data) {
    return jwt.sign(data, JWT_SECRET)
  }
}

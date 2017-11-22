import logger from "koa-logger"
import handleErrors from "./error"
import bodyParser from "koa-bodyparser"
import jwt from "./jwt"
import { IS_DEV } from "../utils/env"

export default app => {
  if (IS_DEV) {
    app.use(logger())
  }

  app.use(handleErrors())
  app.use(bodyParser())
  app.use(jwt())
}

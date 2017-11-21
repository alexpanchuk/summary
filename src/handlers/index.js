import bodyParser from "koa-bodyparser"
import logger from "koa-logger"
import handleErrors from "./error"
import { IS_DEV } from "../utils/env"

export default app => {
  if (IS_DEV) {
    app.use(logger())
  }

  app.use(handleErrors())
  app.use(bodyParser())
}

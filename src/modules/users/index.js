import Router from "koa-router"
import checkUser from "../../handlers/check-user"
import usersController from "./controllers/users-controller"
import checkUserByHash from "./handlers/check-user-by-hash"
import { User } from "./models"

const router = new Router({ prefix: "/users" })

router
  .get("/current-user", checkUser, usersController.getCurrentUser)
  .param("hash", checkUserByHash)
  .get("/:hash/summaries", usersController.getSummariesByUserHash)

export { User }

export default router.routes()

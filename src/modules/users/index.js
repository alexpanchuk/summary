import Router from "koa-router"
import checkUser from "../../handlers/check-user"
import usersController from "./controllers/users-controller"
import { User } from "./models"

const router = new Router({ prefix: "/users" })

router.get("/current-user", checkUser, usersController.getCurrentUser)

export { User }

export default router.routes()

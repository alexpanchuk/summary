import Router from "koa-router"
import authController from "./controllers/auth-controller"

const router = new Router({ prefix: "/auth" })

router
  .post("/singup", authController.singUp)
  .post("/singin", authController.singIn)

export default router.routes()

import Router from "koa-router"
import authController from "./controllers/auth-controller"
import checkUser from "../../handlers/check-user"

const router = new Router({ prefix: "/auth" })

router
  .post("/singup", authController.singUp)
  .post("/singin", authController.singIn)
  .post("/private", checkUser, ctx => {
    ctx.body = ctx.state.user
  })

export default router.routes()

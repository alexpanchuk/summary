import Router from "koa-router"
import auth from "./auth"

const router = new Router({ prefix: "/api" })

router.use(auth)

export default router.routes()

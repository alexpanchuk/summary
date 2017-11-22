import Router from "koa-router"
import authRoutes from "./auth"
import summariesRoutes from "./summaries"

const router = new Router({ prefix: "/api" })

router.use(authRoutes)
router.use(summariesRoutes)

export default router.routes()

import Router from "koa-router"
import authRoutes from "./auth"
import summariesRoutes from "./summaries"
import usersRoutes from "./users"

const router = new Router({ prefix: "/api" })

router.use(authRoutes)
router.use(summariesRoutes)
router.use(usersRoutes)

export default router.routes()

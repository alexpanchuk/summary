import Router from "koa-router"
import summariesController from "./controllers/summaries-controller"
import checkUser from "../../handlers/checkUser"
import { Summary } from "./models"

const router = new Router({ prefix: "/summaries" })

router.post("/", checkUser, summariesController.create)

export { Summary }

export default router.routes()

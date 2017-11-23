import Router from "koa-router"
import summariesController from "./controllers/summaries-controller"
import checkUser from "../../handlers/checkUser"
import { Summary } from "./models"

const router = new Router({ prefix: "/summaries" })

router
  .post("/", checkUser, summariesController.create)
  .put("/:id", checkUser, summariesController.update)

export { Summary }

export default router.routes()

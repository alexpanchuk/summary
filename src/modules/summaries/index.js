import Router from "koa-router"
import summariesController from "./controllers/summaries-controller"
import checkUser from "../../handlers/check-user"
import checkSummary from "./handlers/check-summary"
import checkPermission from "./handlers/check-permission"
import { Summary } from "./models"

const router = new Router({ prefix: "/summaries" })

router
  .post("/", checkUser, summariesController.create)
  .param("hash", checkSummary)
  .put("/:hash", checkUser, checkPermission, summariesController.update)
  .delete("/:hash", checkUser, checkPermission, summariesController.delete)
  .get("/:hash", summariesController.getSummary)

export { Summary }

export default router.routes()

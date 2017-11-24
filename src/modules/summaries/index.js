import Router from "koa-router"
import SummariesController from "./controllers/summaries-controller"
import checkUser from "../../handlers/check-user"
import checkSummary from "./handlers/check-summary"
import checkPermission from "./handlers/check-permission"
import { Summary } from "./models"

const router = new Router({ prefix: "/summaries" })

router
  .post("/", checkUser, SummariesController.create)
  .param("hash", checkSummary)
  .put("/:hash", checkUser, checkPermission, SummariesController.update)
  .delete("/:hash", checkUser, checkPermission, SummariesController.delete)
  .get("/:hash", SummariesController.getSummary)

export { Summary }

export default router.routes()

import Router from "koa-router"
import summariesController from "./controllers/summaries-controller"
import checkUser from "../../handlers/check-user"
import checkSummary from "./handlers/check-summary"
import { Summary } from "./models"

const router = new Router({ prefix: "/summaries" })

router
  .post("/", checkUser, summariesController.create)
  .param("id", checkSummary)
  .put("/:id", checkUser, summariesController.update)
  .delete("/:id", checkUser, summariesController.delete)

export { Summary }

export default router.routes()

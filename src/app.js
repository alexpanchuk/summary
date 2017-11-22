import Koa from "koa"
import initConnectors from "./connectors"
import initHandlers from "./handlers"
import modules from "./modules"

initConnectors()

const app = new Koa()

initHandlers(app)

app.use(modules)
app.use(async ctx => {
  ctx.body = "<h1>Summary</h1>"
})

export default app

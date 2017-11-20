import Koa from "koa"
import initConnectors from "./connectors"

initConnectors()

const app = new Koa()

app.use(async ctx => {
  ctx.body = "<h1>Summary</h1>"
})

export default app

import app from "./app"
import { PORT } from "./config"
import { IS_DEV } from "./utils/env"

const server = app.listen(PORT, err => {
  if (err) console.log(err)

  if (IS_DEV) {
    console.log(`Server running on port: ${PORT}`)
  }
})

export default server

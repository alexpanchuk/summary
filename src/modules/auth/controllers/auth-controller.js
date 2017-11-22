import jwt from "jsonwebtoken"
import pick from "lodash/pick"
import { User } from "../../users"
import { JWT_SECRET } from "../../../config"

export default {
  async singUp(ctx) {
    const newUser = pick(ctx.request.body, User.createFields)
    const { _id } = await User.create(newUser)
    const user = await User.findOneWithPublicFields({ _id })

    ctx.body = { data: user }
  },

  async singIn(ctx) {
    const { email, password } = ctx.request.body

    if (!email || !password) {
      ctx.throw(400, { message: "Invalid data" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      ctx.throw(400, { message: "User with this e-mail doesn't exist" })
    }

    if (!user.comparePasswords(password)) {
      ctx.throw(400, { message: "Invalid password" })
    }

    const token = jwt.sign({ email }, JWT_SECRET)

    ctx.body = { data: token }
  }
}

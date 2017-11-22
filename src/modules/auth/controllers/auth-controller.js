import pick from "lodash/pick"
import jwtService from "../../../../services/jwt-service"
import { User } from "../../users"

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

    const token = await jwtService.genToken({ email })

    ctx.body = { data: token }
  }
}

import pick from "lodash/pick"
import jwtService from "../../../services/jwt-service"
import { userService } from "../../users/services"
import { User } from "../../users/models"

export default {
  async singUp(ctx) {
    const userData = pick(ctx.request.body, User.createFields)
    const { hash } = await userService.createUser(userData)
    const user = await userService.getUserWithPublicFields({ hash })

    ctx.status = 201
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

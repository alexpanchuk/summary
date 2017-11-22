import jwtService from "../services/jwt-service"
import { User } from "../modules/users/models"

export default () => async (ctx, next) => {
  const { authorization } = ctx.headers

  if (authorization) {
    try {
      const { email } = await jwtService.verify(authorization)
      ctx.user = await User.findOne({ email })
    } catch (error) {
      ctx.throw(401, { message: "Unauthorized. Invalid token" })
    }
  }

  await next()
}

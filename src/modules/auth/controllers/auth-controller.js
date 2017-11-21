import pick from "lodash/pick"
import { User } from "../../users"

export default {
  async singUp(ctx) {
    const newUser = pick(ctx.request.body, User.createFields)
    const { _id } = await User.create(newUser)
    const user = await User.findOneWithPublicFields({ _id })

    ctx.body = { data: user }
  }
}

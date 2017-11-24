import UserService from "../services/user-service"
import { Summary } from "../../summaries/models/"

export default {
  async getCurrentUser(ctx) {
    const { user: { _id } } = ctx.state
    const user = await UserService.getUserWithPublicFields({ _id })

    ctx.body = { data: user }
  },

  async getSummariesByUserHash(ctx) {
    const { hash: userHash } = ctx.params

    const summaries = await Summary.find({ userHash })

    if (!summaries) {
      ctx.throw(404, `Summaries of user with hash "${userHash}" not found"`)
    }

    ctx.body = { data: summaries }
  }
}

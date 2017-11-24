import UserService from "../services/user-service"

export default {
  async getCurrentUser(ctx) {
    const { user: { _id } } = ctx.state
    const user = await UserService.getUserWithPublicFields({ _id })

    ctx.body = { data: user }
  }
}

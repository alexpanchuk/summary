import { Summary } from "../../summaries/models/"

export default {
  async getSummariesByUserHash(ctx) {
    const { hash: userHash } = ctx.params

    const summaries = await Summary.find({ userHash })

    if (!summaries) {
      ctx.throw(404, `Summaries of user with hash "${userHash}" not found"`)
    }

    ctx.body = { data: summaries }
  }
}

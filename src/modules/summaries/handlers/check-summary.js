import { Summary } from "../models"

export default async (_id, ctx, next) => {
  const { _id: userId } = ctx.state.user
  const summary = await Summary.findOne({ _id })

  if (!summary) {
    ctx.throw(404, `Summary with id "${_id}" not found`)
  }

  if (summary.userId !== userId.toHexString()) {
    ctx.throw(
      403,
      `Forbidden. Summary with id "${_id}" don't belong to user with id "${
        userId
      }"`
    )
  }

  ctx.state.summary = summary

  await next()
}

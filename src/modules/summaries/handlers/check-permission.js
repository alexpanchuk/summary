export default async (ctx, next) => {
  const { user: { _id: userId, hash }, summary } = ctx.state

  if (summary.userId !== userId.toHexString()) {
    ctx.throw(
      403,
      `Forbidden. Summary with hash "${
        summary.hash
      }" don't belong to user with hash "${hash}"`
    )
  }

  await next()
}

export default async (ctx, next) => {
  const { user: { hash: currentUserHash }, summary } = ctx.state

  if (summary.userHash !== currentUserHash) {
    ctx.throw(
      403,
      `Forbidden. Summary with hash "${
        summary.hash
      }" don't belong to user with hash "${currentUserHash}"`
    )
  }

  await next()
}

export default async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw(403, { message: "Forbidden. You are not singed in" })
  }

  await next()
}

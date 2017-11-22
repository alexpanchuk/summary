export default async (ctx, next) => {
  if (!ctx.user) {
    ctx.throw(403, { message: "Forbidden" })
  }

  await next()
}

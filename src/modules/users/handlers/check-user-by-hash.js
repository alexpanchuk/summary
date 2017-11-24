import { User } from "../models/"

export default async (hash, ctx, next) => {
  const user = await User.findOne({ hash })

  if (!user) {
    ctx.throw(400, `User with hash "${hash}" not found`)
  }

  await next()
}

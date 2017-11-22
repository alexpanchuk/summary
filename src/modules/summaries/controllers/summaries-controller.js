import pick from "lodash/pick"
import { Summary } from "../models"

export default {
  async create(ctx) {
    const { _id } = await Summary.create({
      ...pick(ctx.request.body, Summary.createFields),
      userId: ctx.user._id
    })
    const summary = await Summary.findOne({ _id })

    ctx.body = { data: summary }
  }
}

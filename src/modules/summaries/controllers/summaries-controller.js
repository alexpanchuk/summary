import pick from "lodash/pick"
import { Summary } from "../models"
import summaryService from "../services/summary-service"

export default {
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, Summary.createFields),
      userId: ctx.user._id
    }

    try {
      const { _id } = await summaryService.createSummary(summaryData)
      const summary = await Summary.findOne({ _id })

      ctx.body = { data: summary }
    } catch (error) {
      ctx.throw(400, error)
    }
  }
}

import pick from "lodash/pick"
import { Summary } from "../models"
import SummaryService from "../services/summary-service"

export default {
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, Summary.createFields),
      userId: ctx.state.user._id
    }

    const { _id } = await SummaryService.createSummary(summaryData)
    const summary = await Summary.findOne({ _id })

    ctx.status = 201
    ctx.body = { data: summary }
  },

  async update(ctx) {
    const dataToUpdate = pick(ctx.request.body, Summary.createFields)
    const updatedSummary = await SummaryService.updateSummary(
      dataToUpdate,
      ctx.state.summary
    )

    ctx.body = { data: updatedSummary }
  },

  async delete(ctx) {
    const { summary } = ctx.state
    const deletedSummary = await summary.remove()

    ctx.body = { data: deletedSummary._id }
  }
}

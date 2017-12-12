import pick from "lodash/pick"
import { Summary } from "../models"
import SummaryService from "../services/summary-service"

export default {
  async create(ctx) {
    const data = {
      ...pick(ctx.request.body, Summary.createFields),
      userHash: ctx.state.user.hash
    }

    const { hash } = await SummaryService.createSummary(data)
    const summary = await Summary.findOne({ hash })

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

    ctx.body = { data: { hash: deletedSummary.hash } }
  },

  getSummary(ctx) {
    const { summary } = ctx.state
    ctx.body = { data: pick(summary, Summary.publicFields) }
  }
}

import pick from "lodash/pick"
import { Summary } from "../models"
import SummaryService from "../services/summary-service"
import parseQueryForSearch from "../helpers/parseQueryForSearch"

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
  },

  async searchSummaries(ctx) {
    const queryParams = pick(ctx.request.query, [
      "title",
      "tags",
      "size",
      "page"
    ])
    const searchParams = parseQueryForSearch(queryParams)

    const { summaries, ...rest } = await SummaryService.searchSummaries(
      searchParams
    )

    ctx.body = {
      data: summaries,
      searchParams,
      ...rest
    }
  }
}

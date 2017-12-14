import { Summary } from "../models"

export default {
  async createSummary(data) {
    const { userHash } = data
    const summaryCountByUserHash = await Summary.count({ userHash })

    if (summaryCountByUserHash >= 3) {
      throw new AppError({
        status: 400,
        message: "User can't create more than 3 summaries"
      })
    }

    return Summary.create(data)
  },

  updateSummary(data, summary) {
    summary.set(data)

    return summary.save()
  },

  async searchSummaries(params) {
    const { title, tags, size, page } = params
    const query = {
      title: { $regex: new RegExp(title, "ig") }
    }

    if (tags.length) {
      query.tags = { $in: tags }
    }

    const count = await Summary.count(query)
    const pages = Math.ceil(count / size)

    const summaries = await Summary.find(query)
      .sort({ updatedAt: -1 })
      .limit(size)
      .skip((page - 1) * size)

    return {
      summaries,
      count,
      pages
    }
  }
}

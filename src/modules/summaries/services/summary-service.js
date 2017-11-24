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
  }
}

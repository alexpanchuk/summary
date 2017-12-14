import pick from "lodash/pick"
import { connect, dropDb, close } from "../../../../utils/mongo"
import { summaryService } from "../../services"
import AppError from "../../../../helpers/app-error"

global.AppError = AppError

describe("Summary Service", () => {
  beforeAll(async () => {
    await connect()
    await dropDb()
  })

  afterAll(async () => {
    await close()
  })

  it("Should create summary as expected", async () => {
    const summaryData = {
      userHash: "Should create summary as expected",
      title: "Should create summary as expected",
      description: "Should create summary as expected",
      tags: ["js", "node"]
    }

    const summaryModel = await summaryService.createSummary(summaryData)
    const summary = summaryModel.toObject()

    expect(pick(summary, Object.keys(summaryData))).toEqual(summaryData)
    expect(summary).toHaveProperty("hash")
    expect(summary).toHaveProperty("createdAt")
    expect(summary).toHaveProperty("updatedAt")

    await dropDb()
  })

  it("Should throw an error when user create more then 3 summaries", async () => {
    const summaryData = {
      userHash: "more then 3 summaries",
      title: "more then 3 summaries",
      description: "more then 3 summaries",
      tags: ["js", "node"]
    }

    await summaryService.createSummary(summaryData)
    await summaryService.createSummary(summaryData)
    await summaryService.createSummary(summaryData)

    try {
      await summaryService.createSummary(summaryData)
    } catch (error) {
      expect(error).toEqual(
        new AppError({
          status: 400,
          message: "User can't create more than 3 summaries"
        })
      )
    }

    await dropDb()
  })

  it("Should throw validation error for missing fields when create summary", async () => {
    try {
      await summaryService.createSummary({})
    } catch (error) {
      const { errors } = error

      expect(errors).toHaveProperty("userHash")
      expect(errors).toHaveProperty("title")
      expect(errors).toHaveProperty("description")
      expect(errors).toHaveProperty("tags")
    }
  })
})

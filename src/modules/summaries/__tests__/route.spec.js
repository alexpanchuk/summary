import supertest from "supertest"
import server from "../../../server"
import { close, dropDb } from "../../../utils/mongo/"
import { summaryService } from "../services/"
import { MAX_SIZE, START_PAGE } from "../constants/pagination"

describe("Summary Routes", () => {
  describe("Summaries Search", () => {
    afterAll(async () => {
      await dropDb()
      await close()
      await server.close()
    })

    it("Should return empty answer for get all", async () => {
      const { body: response } = await supertest(server).get("/api/summaries")

      expect(response).toEqual({
        data: [],
        searchParams: {
          title: "",
          tags: [],
          size: MAX_SIZE,
          page: START_PAGE
        },
        pages: 0,
        count: 0
      })
    })

    it("Should return result of searching as expected", async () => {
      await summaryService.createSummary({
        title: "Senior JS",
        userHash: "hash",
        description: "desc",
        tags: ["js"]
      })

      await summaryService.createSummary({
        title: "Middle JS",
        userHash: "hash",
        description: "desc",
        tags: ["js"]
      })

      await summaryService.createSummary({
        title: "Senior PHP",
        userHash: "hash",
        description: "desc",
        tags: ["php"]
      })

      const response = await supertest(server).get("/api/summaries?title=se")
      const { body: { searchParams, data, count, pages } } = response

      expect(searchParams).toEqual({
        title: "se",
        tags: [],
        size: 20,
        page: 1
      })
      expect(data).toHaveLength(2)
      expect(count).toBe(2)
      expect(pages).toBe(1)
    })

    it("Should return no results for search", async () => {
      const response = await supertest(server).get("/api/summaries?title=Jun")
      const { body: { searchParams, data, count, pages } } = response

      expect(searchParams).toEqual({
        title: "Jun",
        tags: [],
        size: 20,
        page: 1
      })
      expect(data).toHaveLength(0)
      expect(count).toBe(0)
      expect(pages).toBe(0)
    })
  })
})

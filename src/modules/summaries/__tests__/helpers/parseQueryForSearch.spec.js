import { MAX_SIZE, START_PAGE } from "../../constants/pagination"
import parseQueryForSearch from "../../helpers/parseQueryForSearch"

describe("ParseQueryForSearch", () => {
  it("Should parse query as expected with superfluous options", () => {
    const res = parseQueryForSearch({ fakeParam: "fake" })

    expect(res).toEqual({
      title: "",
      tags: [],
      size: MAX_SIZE,
      page: START_PAGE
    })
  })

  it("Should parse query as expected", () => {
    const data = {
      title: "Middle Javascript developer",
      tags: "js,node",
      size: 12,
      page: 2
    }

    const res = parseQueryForSearch(data)

    expect(res).toEqual({
      ...data,
      tags: data.tags.split(",")
    })
  })

  it("Should return default size", () => {
    const res = parseQueryForSearch({ size: 30 })

    expect(res).toEqual({
      title: "",
      tags: [],
      size: MAX_SIZE,
      page: START_PAGE
    })
  })
})

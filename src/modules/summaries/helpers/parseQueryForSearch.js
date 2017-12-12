import { MAX_SIZE, START_PAGE } from "../constants/pagination"

export default queryParams => {
  const searchParams = {
    title: queryParams.title ? queryParams.title : "",
    tags: queryParams.tags ? queryParams.tags.split(",") : [],
    size: parseInt(queryParams.size, 10),
    page: queryParams.page ? parseInt(queryParams.page, 10) : START_PAGE
  }

  if (!queryParams.size || queryParams.size > MAX_SIZE) {
    searchParams.size = MAX_SIZE
  }

  return searchParams
}

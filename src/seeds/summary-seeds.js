import faker from "faker"
import _ from "lodash"
import { Summary } from "../modules/summaries/models"

function init(amount, users) {
  if (!users || !users.length) {
    throw Error("Users in SummarySeed are required")
  }

  const promises = []

  _.times(amount, () => {
    const summaryPromise = Summary.create({
      title: faker.lorem.words(2, 5),
      description: faker.lorem.lines(4, 10),
      tags: faker.lorem.words(2, 6).split(" "),
      userHash: users[faker.random.number(0, users.length - 1)].hash
    })

    promises.push(summaryPromise)
  })

  return Promise.all(promises)
}

export default init

import faker from "faker"
import _ from "lodash"
import { Summary } from "../modules/summaries/models"

function init(amount, users) {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min)

  if (!users || !users.length) {
    throw Error("Users in SummarySeed are required")
  }

  const promises = []

  _.times(amount, () => {
    const summaryPromise = Summary.create({
      title: faker.lorem.words(getRandomInt(2, 5)),
      description: faker.lorem.lines(getRandomInt(4, 10)),
      tags: faker.lorem.words(getRandomInt(2, 6)).split(" "),
      userHash: users[faker.random.number(users.length - 1)].hash
    })

    promises.push(summaryPromise)
  })

  return Promise.all(promises)
}

export default init

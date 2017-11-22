import { User } from "../models"

export default {
  createUser(data) {
    return User.create(data)
  },

  getUserWithPublicFields(params) {
    return User.findOne(params).select({
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0
    })
  }
}

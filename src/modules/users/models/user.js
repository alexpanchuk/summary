import mongoose, { Schema } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import bcrypt from "bcrypt"

mongoose.plugin(uniqueValidator)

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: 'User with email "{VALUE}" already exist',
      lowercase: true,
      required: "Email is required"
    },
    password: {
      type: String,
      required: "Password is required"
    },
    firstName: {
      type: String,
      lowercase: true,
      required: "firstName is required"
    },
    lastName: {
      type: String,
      lowercase: true,
      required: "lastName is required"
    }
  },
  {
    timestamps: true
  }
)

UserSchema.statics.createFields = ["email", "password", "firstName", "lastName"]

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next()
  }

  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)

  return next()
})

UserSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({
    password: 0,
    _id: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0
  })
}

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", UserSchema)

export default User

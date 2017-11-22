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
      required: "Email is required",
      trim: true
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true
    },
    firstName: {
      type: String,
      lowercase: true,
      required: "firstName is required",
      trim: true
    },
    lastName: {
      type: String,
      lowercase: true,
      required: "lastName is required",
      trim: true
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

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", UserSchema)

export default User

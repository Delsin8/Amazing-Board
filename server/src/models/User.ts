import { ProjectSchema } from '../utils/customSchema'
import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser extends Document {
  username: string
  password: string
  isTempUser?: boolean
  comparePassword(password: string): Promise<boolean>
}

const userSchema: Schema = new ProjectSchema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isTempUser: { type: Boolean, default: false },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password as string, salt)
  next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model<IUser>('User', userSchema)

export default User
export { IUser }

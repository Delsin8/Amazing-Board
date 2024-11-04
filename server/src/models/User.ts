import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  username: string
  email: string
  password: string
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
export { IUser }

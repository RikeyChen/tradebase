import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.getPublicFields = function() {
  const { password, ...user } = this._doc;
  return user;
}

const User = mongoose.model('User', UserSchema);

export default User;
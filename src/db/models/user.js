import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    contry: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
  },
  {
    // toJSON: { virtuals: true, versionKey: false },
    toJSON: {
      transform: (doc, user) => {
        user.id = user._id;
        delete user._id;
        delete user.__v;
      },
    },
  }
);

export default mongoose.model('User', userSchema);

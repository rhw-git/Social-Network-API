// require for mongoos function
const { Schema, model } = require('mongoose');
// schema for User model
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: 'User Name is required',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'Email is required',
      // matchvalid email
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtual: true,
    },
    id: false,
  },
);
// create a vitual to count the number of firends per user
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
// create User with UserSchema
const User = model('User', UserSchema);
// export the User model
module.exports = User;

// require mongoose function Schema and model
const { Schema, model } = require('mongoose');
// require moment pacakge
const moment = require('moment');
// Schema to create Thought
const ThoughtSchema = new Schema(
  /* 
  expect:
  {
    "thoughtText": "this is the first post of xxx",
    "userName": "5f674c845d34392988ec9101"
  }
  */
  {
    thoughtText: {
      type: String,
      required: 'Thought text is required',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    userName: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reactions: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);
// create the Thought model using the ThougthSchema
const Thought = model('Thought', ThoughtSchema);
// export the Thought model
module.exports = Thought;

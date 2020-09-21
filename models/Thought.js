// require mongoose function Schema and model
const { Schema, model, Types } = require('mongoose');
// require moment pacakge
const moment = require('moment');
// Schema to create Reaction
const ReactionSchema = new Schema(
  /* 
  expect:
  {
    "reactionBody": "This is a nice thought",
    "username": "5f67e3b7dacb0b1d407bd867"
  }
  */
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'Reaction body is required',
      maxlength: 280,
    },
    userName: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);
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
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);
// create a vitual to count the number of reactions
ThoughtSchema.virtual('reactionCount').get(function () {
  if (this.reactions === undefined) {
    return;
  }
  return this.reactions.length;
});
// create the Reaction model using the ReactionSchema
// create the Thought model using the ThougthSchema
const Thought = model('Thought', ThoughtSchema);
// export the Thought model
module.exports = Thought;

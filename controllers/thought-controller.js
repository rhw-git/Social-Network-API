// bring Thought model from index.js inside model
const { Thought, User } = require('../models/index');

// controllers for Thought model
const thoughtController = {
  // get all
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'userName',
        select: 'userName',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log('GET ALL THOUGHTS =>', err);
        res.status(500).json(err);
      });
  },
  // get by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'userName',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log('GET THOUGHT BY ID =>', err);
        res.status(500).json(err);
      });
  },
  // post
  async createThought({ params, body }, res) {
    let newThought = await Thought.create(body).catch((err) => {
      console.log('CREATE A NEW THOUGHT =>', err);
      res.status(500).json(err);
    });
    let returnNewThought = await newThought
      .populate({ path: 'userName', select: 'userName' })
      .execPopulate();
    // deconstruct and rename _id of the new thought, and the _id of the user
    let {
      _id: thoughtId,
      userName: [{ _id: userId }],
    } = returnNewThought;
    // update user model
    let updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: thoughtId } },
      { new: true },
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        return;
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    res.json(returnNewThought);
  },
  // update
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log('UPDATE THOUGHT =>', err);
        res.status(400).json(err);
      });
  },
  // delete
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .populate({
        path: 'username',
        select: 'userName',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No though find with this id' });
          return;
        }
        res.json(dbThoughtData);
        return dbThoughtData;
      })
      // deconstruct and rename _id of the new thought, and the _id of the user
      .then(({ _id: thoughtId, username: [{ _id: userId }] }) => {
        // update Users
        User.findOneAndUpdate(
          { _id: userId },
          { $pull: { thoughts: thoughtId } },
          { new: true },
        ).catch((err) => {
          res.status(500).json(err);
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true },
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thought find with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  // delete reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true },
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thought find with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

// export the controller functions
module.exports = thoughtController;

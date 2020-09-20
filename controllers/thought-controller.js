// bring Thought model from index.js inside model
const { Thought, User } = require('../models/index');

// controllers for Thought model
const thoughtController = {
  // get all
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'username',
        select: '-__v',
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
        path: 'username',
        select: '-__v',
      })
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
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log('CREATE ONE THOUGHT', err);
        res.status(400).json(err);
      });
  },
  // update
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true });
    then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(dbThoughtData);
    }).catch((err) => {
      console.log('UPDATE THOUGHT =>', err);
      res.status(400).json(err);
    });
  },
  // delete
  deleteThought({ param }, res) {
    Thought.findOneAndDelete({ _id: params.id }).then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No though find with this id' });
        return;
      }
      res.json(dbThoughtData);
    });
  },
};

// export the controller functions
module.exports = thoughtController;

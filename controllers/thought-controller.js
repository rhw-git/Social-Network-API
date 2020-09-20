// bring Thought model from index.js inside model
const { Thought, User } = require('../models/index');

// controllers for Thought model
const thoughtController = {
  // get all
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'username',
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
  async createThought({ body }, res) {
    let newThought = await Thought.create(body).catch((err) => {
      console.log('CREATE A NEW THOUGHT =>', err);
      res.status(500).json(err);
    });
    let returnNewThought = await newThought
      .populate({ path: 'username', select: 'userName' })
      .execPopulate();
    res.json(returnNewThought);
  },
  // update
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
      });
  },
};

// export the controller functions
module.exports = thoughtController;

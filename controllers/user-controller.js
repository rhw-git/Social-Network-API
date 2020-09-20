// bring User model from index.js inside model
const { User, Thought } = require('../models/index');

// controllers for User model
const userController = {
  // get all
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'friends',
        select: 'userName',
      })
      .populate({
        path: 'thoughts',
        select: 'thoughtText',
      })
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log('GET ALL USERS =>', err);
        res.status(500).json(err);
      });
  },
  // get by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'friends',
        select: 'userName',
      })
      .populate({
        path: 'thoughts',
        select: 'thoughtText',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log('GET USER BY ID =>', err);
        res.status(500).json(err);
      });
  },
  // post
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log('CREATE ONE USER', err);
        res.status(400).json(err);
      });
  },
  // update
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log('UPDATE USER =>', err);
        res.status(400).json(err);
      });
  },
  // delete
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
        return dbUserData;
      })
      .then(({ thoughts: thoughtIds }) => {
        const query = { _id: { $in: thoughtIds } };
        Thought.deleteMany(query, (err, obj) => {
          if (err) throw err;
        });
      })
      .catch((err) => {
        console.log('DELETE ONE USER =>', err);
        res.status(400).json(err);
      });
  },
};

// export the controller functions
module.exports = userController;

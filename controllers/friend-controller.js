const { User } = require('../models');

const friendController = {
  // add friends
  addFriend({ params: { userId, friendId } }, res) {
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friendId } },
      { new: true },
    )
      .populate({
        path: 'firends',
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
        res.json(err);
      });
  },
  // remove friends
  removeFriend({ params: { userId, friendId } }, res) {
    User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true },
    )
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
        res.json(err);
      });
  },
};

module.exports = friendController;

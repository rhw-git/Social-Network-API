const router = require('express').Router();
const {
  addFriend,
  removeFriend,
} = require('../../controllers/friend-controller');

router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;

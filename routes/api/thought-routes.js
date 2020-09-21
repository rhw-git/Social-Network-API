const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// set up get all at api/thoughts
router.route('/').get(getAllThought).post(createThought);
// set up get one, put and delete at api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
// set up add reaction routes
router.route('/:thoughtId/reactions').put(addReaction);
// set up remove reaction routes
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thought-controller');

// set up get all at api/thoughts
router.route('/').get(getAllThought).post(createThought);
// set up post a new thought at api/thoughts/:userId
// router.route('/:userId').post(createThought);
// set up get one, put and delete at api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;

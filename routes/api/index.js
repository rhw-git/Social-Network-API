const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of "users" to routes created in "user-routes.js"
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

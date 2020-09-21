const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const friendRoutes = require('./friend-routes');

// add prefix for all routes
router.use('/users', userRoutes, friendRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

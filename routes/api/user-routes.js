const router = require("express").Router();

const {
  getAllUser,
  getUserById, 
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// set up get all and post at api/users
router.route("/").get(getAllUser).post(createUser);
// set up get one, put, and delete at api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;

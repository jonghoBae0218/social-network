const router = require("express").Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;

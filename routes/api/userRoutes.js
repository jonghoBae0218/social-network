const router = require("express").Router();

const { getUsers, createUser } = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").get();

module.exports = router;

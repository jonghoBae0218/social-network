const router = require("express").Router();

const {
  getThoughts,
  createThought,
  getThought,
} = require("../../controllers/thoughtController");
// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getThought);

// /api/thoughts/:thoughtId/reactions

module.exports = router;

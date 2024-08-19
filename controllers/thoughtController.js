const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const thoughtOwner = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      if (!thoughtOwner) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      res.json(thoughtOwner);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(updatedThought);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      const thoughtOwner = await User.findOneAndUpdate(
        { username: deletedThought.username },
        { $pull: { thoughts: deletedThought._id } },
        { new: true }
      );
      if (!thoughtOwner) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(thoughtOwner);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(reaction);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.body.reactionId } } }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No thought or reaction with this ID" });
      }

      res.json(reaction);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};

const { Thought, User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.id,
      });
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }
      return res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.id,
      });
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      // Remove the user's associated thoughts
      //   await Thought.deleteMany({ username: user.username });

      return res.json("Deleted sucessfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const newFriend = await User.findOne({ _id: req.params.friendId });
      if (!newFriend) {
        return res
          .status(404)
          .json({ message: "No friend found with that id" });
      }
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: newFriend._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      return res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const deleteFriend = await User.findOne({ _id: req.params.friendId });
      if (!deleteFriend) {
        return res
          .status(404)
          .json({ message: "No friend found with that id" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: deleteFriend._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      return res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

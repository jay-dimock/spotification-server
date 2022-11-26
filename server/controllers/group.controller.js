const { Group } = require("../models/group.model.js");

module.exports.test = async (req, res) => {
  res.send("Hello world");
};

module.exports.getGroups = async (req, res) => {
  console.log(req.params);
  Group.find({ userId: req.params.userId })
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json(err));
};

module.exports.createGroup = async (req, res) => {
  const { spotifyId, userId, spotifyPlaylistIds } = req.body;
  Group.create({ spotifyId, userId, spotifyPlaylistIds })
    .then((group) => res.status(201).json(group))
    .catch((err) => res.status(400).json(err));
};

// to do: add playlist, remove playlist, delete group, rename group

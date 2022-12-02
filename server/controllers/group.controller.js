const { Group } = require("../models/group.model.js");

module.exports.test = async (req, res) => {
  res.send("Hello world");
};

module.exports.getGroups = async (req, res) => {
  console.log(req.params);
  Group.find({ userId: req.params.userId })
    .then((groups) => {
      const pdict = {};
      const gdict = {};
      groups.forEach((g) => {
        gdict[g.spotifyId] = g.spotifyPlaylistIds;

        // compile a dict for faster lookup of groups by playlist
        g.spotifyPlaylistIds.forEach((pid) => {
          if (!pdict[pid]) {
            pdict[pid] = [g.spotifyId];
          } else {
            pdict[pid].push(g.spotifyId);
          }
        });
      });

      res.json({ groups: gdict, playlists: pdict });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports.createGroup = async (req, res) => {
  const { spotifyId, userId, spotifyPlaylistIds } = req.body;
  Group.create({ spotifyId, userId, spotifyPlaylistIds })
    .then((group) => res.status(201).json(group))
    .catch((err) => res.status(400).json(err));
};

module.exports.updatePlaylistsForGroup = async (req, res) => {
  Group.findOneAndUpdate(
    { spotifyId: req.params.spotifyId },
    { spotifyPlaylistIds: req.body },
    { new: true }
  )
    .then((group) => res.json(group))
    .catch((err) => res.status(400).json(err));
};

module.exports.deleteGroup = async (req, res) => {
  Group.findOneAndDelete({ spotifyId: req.params.spotifyId })
    .then((group) => res.json(group))
    .catch((err) => res.status(400).json(err));
};

// to do: add playlist, remove playlist, delete group, rename group

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const GroupSchema = new mongoose.Schema(
  {
    spotifyId: {
      type: String,
      required: [true, "Group playlist ID is required"],
      minlength: [2, "Group playlist ID is not long enough"],
      unique: [true, "Group playlist ID already exists"],
    },
    userId: {
      type: String,
      required: [true, "Group user ID is required"],
      minlength: [1, "Group user ID is not long enough"],
    },
    spotifyPlaylistIds: [{ type: String }],
  },
  { timestamps: true }
);

GroupSchema.plugin(uniqueValidator);

module.exports.Group = mongoose.model("Group", GroupSchema);

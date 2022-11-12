const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        required: [true, "Spotify ID is required"],
        minlength: [2,"Spotify ID is not long enough"], 
        unique: [true, "Spotify ID already exists"],
    },

    email: {
        type: String,
        required: [true, "Spotify email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Spotify email format is invalid"
        }
    },
}, {timestamps: true});

module.exports.User = mongoose.model("User", UserSchema);
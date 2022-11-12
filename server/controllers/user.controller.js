const {User} = require('../models/user.model.js');

module.exports.test = async (req, res) => { 
    // res.send("Hello world");
    try {
        // const user = await User.findOne({ spotifyId:"4" });
        const user = await User.find();
        return res.json( user );
    } catch (err) {
        res.status(500).json(err.message);
        // res.json(err.message);
    }
}

module.exports.create = async(req, res) => {
    // console.log(req.body);
    await User.findOne({ spotifyId: req.body.spotifyId })
        .then(existingUser => {
            //console.log(existingUser);
            if (existingUser !== null) {
                res.status(400).json({errors: { id: {message: "A user already exists with this ID" }}});
            } else {
                const user = new User(req.body);
                user
                    .save() //before save, the password confirm validation will happen
                    .then(() => res.status(201).json(user))
                    .catch(err => res.status(400).json(err));
            }
        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = (req, res) => {
    User.findOne({ spotifyId: req.body.spotifyId })
        .then(user => {
            if (user === null) {
                return res.status(400).json({errors: { email: {message: "Email was not found" }}});
            } else {
                return res.json({
                    _id: user._id,
                });
            }
        })
        .catch(err => res.status(400).json(err));
}

module.exports.update = (req, res) => {
    User.findOneAndUpdate({ spotifyId: req.params.spotifyId }, req.body, {new:true})
        .then(user => res.json({user: user}))
            // if (user !== null) {
            //     user.theme = req.body.theme;
            //     user.save();
            // }

        .catch(err => res.status(400).json(err));
}
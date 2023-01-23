// const {User} = require('../models/user.model.js');
const querystring = require("querystring");
const fetch = require("cross-fetch");

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

module.exports.test = async (req, res) => {
  res.send("Hello world");
};

// Redirects user to Spotify OAuth page.
// After successful login, Spotify will redirect to
// our auth endpoint.
module.exports.login = (req, res) => {
  const scope = `user-library-read 
    playlist-read-private 
    streaming 
    user-read-email 
    user-read-private 
    playlist-modify-private 
    playlist-modify-public`;

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        show_dialog: true,
      })
  );
};

// Spotify sends an auth code here. This endpoint
// exchanges the code for a token which is then sent
// to our front end.
module.exports.auth = async (req, res) => {
  const body = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: encodeFormData(body),
  })
    .then((response) => response.json())
    .then((data) => {
      const query = querystring.stringify(data);
      res.redirect(`${process.env.CLIENT_REDIRECT_URI}?${query}`);
    });
};

module.exports.refresh = async (req, res) => {
  if (!req.query.refresh_token) {
    return res
      .status(400)
      .json({ error: "Refresh token request is missing refresh_token value" });
  }
  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeFormData({
      grant_type: "refresh_token",
      refresh_token: req.query.refresh_token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
};

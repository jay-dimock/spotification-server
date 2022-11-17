const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");

module.exports = (app) => {
  app.get("/api/playlists/user/test", UserController.test);
  app.post("/api/playlists/user/create", UserController.create);
  app.post("/api/playlists/user/login", UserController.login);
  app.put("/api/playlists/user/:spotifyId", UserController.update);

  app.get("/api/playlists/auth/test", AuthController.test);
  app.get("/api/playlists/auth/login", AuthController.login);
  app.get("/api/playlists/auth/auth", AuthController.auth);
  app.get("/api/playlists/auth/refresh", AuthController.refresh);
};

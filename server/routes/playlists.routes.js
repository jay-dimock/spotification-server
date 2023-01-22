const AuthController = require("../controllers/auth.controller");
const GroupController = require("../controllers/group.controller");

module.exports = (app) => {
  app.get("/api/playlists/auth/test", AuthController.test);
  app.get("/api/playlists/auth/login", AuthController.login);
  app.get("/api/playlists/auth/auth", AuthController.auth);
  app.get("/api/playlists/auth/refresh", AuthController.refresh);

  app.post("/api/playlists/groups", GroupController.createGroup);
  app.put(
    "/api/playlists/groups/:spotifyId",
    GroupController.updatePlaylistsForGroup
  );
  app.get("/api/playlists/groups/:userId", GroupController.getGroups);
  app.delete("/api/playlists/groups/:spotifyId", GroupController.deleteGroup);
};

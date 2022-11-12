const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/mongoose.config");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PlaylistsRoutes = require("./routes/playlists.routes");
PlaylistsRoutes(app);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

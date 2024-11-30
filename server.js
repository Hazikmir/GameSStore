const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));  // Serve static files like HTML, CSS, JS

app.post("/upload", upload.fields([{ name: "logo" }, { name: "gameFile" }]), (req, res) => {
  const gameName = req.body.name;
  const gameDescription = req.body.description;
  const logo = req.files["logo"][0].filename;
  const gameFile = req.files["gameFile"][0].filename;

  // Store game data in a database or array (for this example, we'll just send it back)
  const newGame = {
    name: gameName,
    description: gameDescription,
    logo: `/uploads/${logo}`,
    file: `/uploads/${gameFile}`,
  };

  res.json(newGame);  // Send back the uploaded game data
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
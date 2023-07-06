const fs = require("fs/promises");
const express = require("express");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

//SUGAL API

const PORT = 3000;

const app = express();

app.use(express.json());

//APIs FOR COLOR GAME
app.get("/color-game", async (req, res) => {
  const colors = ["Blue", "Red", "Green", "White", "Pink", "White"];
  const timestamp = Math.floor(Date.now() / 1000);
  const color = _.sample(colors);

  try {
    await fs.mkdir("data/color-game", { recursive: true });
    await fs.writeFile(
      `data/color-game/${timestamp}.txt`,
      `DATE: ${new Date()} \nCOLOR: ${color}`
    );
  } catch (err) {
    return res.sendStatus(500);
  }

  res.json({ color });
});

app.listen(PORT, () => {
  console.log("API Server is running at port " + PORT);
});

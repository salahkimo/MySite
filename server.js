const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

// Charger les votes
function loadVotes() {
  return JSON.parse(fs.readFileSync("votes.json"));
}

// Sauvegarder les votes
function saveVotes(votes) {
  fs.writeFileSync("votes.json", JSON.stringify(votes));
}

// Page de vote
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Soumission du vote
app.post("/vote", (req, res) => {
  const choice = req.body.choice;
  const votes = loadVotes();

  if (choice === "A") votes.A++;
  if (choice === "B") votes.B++;

  saveVotes(votes);
  res.send("Merci pour votre vote !");
});

app.get("/results", (req, res) => {
  res.sendFile(__dirname + "/views/resultats.html");
});

app.listen(PORT, () => console.log("Server running on port " + PORT));


app.get("/results-json", (req, res) => {
  res.json(loadVotes());
});

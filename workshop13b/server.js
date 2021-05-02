require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
app.use(express.json());

const post = [
  {
    username: "Aditya",
    title: "Raj",
  },
  {
    username: "Bhakti",
    title: "Dua",
  },
  {
    username: "Pushpender",
    title: "Rana",
  },
  {
    username: "Shivam",
    title: "Saxena",
  },
  {
    username: "Naman",
    title: "Sharma",
  },
  {
    username: "Vasu",
    title: "Seghal",
  },
];

app.get("/post", authenticateToken, (req, res) => {
  res.json(post.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  // Authenticate user

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => console.log("Server Started"));

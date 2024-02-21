import express from "express";

import session from "express-session";

import connectMongoDbSession from "connect-mongodb-session";

import mongoose from "mongoose";

import User from "./models/User.js";

import cors from "cors";

const mongoSession = connectMongoDbSession(session);

const store = new mongoSession({
  uri: "mongodb://127.0.0.1:27017/alley-db",
  collection: "sessions",
});

mongoose.connect("mongodb://127.0.0.1:27017/alley-db").catch(console.error);

const app = express();

app.use(
  session({
    secret: Math.random().toString(),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60_000, secure: false },
    store: store,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.session.cookie);
  req.session.views = (req.session.views || 0) + 1;
  res.json({
    views: req.session.views,
  });
});

app.post("/session", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  req.session.userId = user._id;
  req.session.authenticated = true;
  res.status(200).json({ message: "Logged in" });
});

app.get("/session", (req, res) => {
  console.log(req.session);
  if (req.session.authenticated) {
    res.status(200).json({ message: "Authenticated" });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(3000);

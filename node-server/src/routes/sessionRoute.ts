import express from "express";
import { User } from "../models";
const router = express.Router();

router.post("/", async (req, res) => {
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
  req.session.save();
  res.status(200).json({ message: "Logged in" });
});

router.get("/", (req, res) => {
  console.log(req.session.authenticated);
  if (req.session.authenticated) {
    res.status(200).json({ message: "Authenticated" });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;

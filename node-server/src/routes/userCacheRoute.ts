import express from "express";
import { UserCache } from "../models";
const router = express.Router();

router.get("/", async (req, res) => {
  const userCache = await UserCache.findOne({
    userId: req.session.userId,
  });
  if (!userCache) {
    const userCache = await UserCache.create({ userId: req.session.userId });
    return res.json(userCache);
  }
  res.json(userCache);
});

router.put("/", async (req, res) => {
  const update = req.body;
  console.log(update, req.session.userId);
  const userCache = await UserCache.findOneAndUpdate(
    { userId: req.session.userId },
    update,
    { upsert: true } // Make this update into an upsert
  );
  res.json(userCache);
});

export default router;

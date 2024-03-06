import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session.cookie);
  req.session.views = (req.session.views || 0) + 1;
  req.session.save();
  res.json({
    views: req.session.views,
  });
});

export default router;

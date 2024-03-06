import express from "express";
import { Company } from "../models";
const router = express.Router();

router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

export default router;

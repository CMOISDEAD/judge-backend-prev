import express from "express";
import { handleTest } from "../controllers";

const router = express.Router();

router.post("/test", handleTest);

router.get("/", (_req, res) => {
  res.send("Hello, World!");
});

export default router;

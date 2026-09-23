import express from "express";
import samplesRouter from "./samples.js";

const router = express.Router();

router.use("/samples", samplesRouter);

export default router;

import express from "express";
import {
  getAllSamples,
  getSampleById,
  createSample,
  updateSample,
  deleteSample,
} from "../db/store.js";
import { validateSampleCreate, validateSampleUpdate } from "../middlewares/validateSample.js";

const router = express.Router();

router.get("/stats", async (req, res, next) => {
  try {
    const samples = getAllSamples();
    const total = samples.length;
    const byOrganism = samples.reduce((acc, sample) => {
      acc[sample.organism] = (acc[sample.organism] || 0) + 1;
      return acc;
    }, {});
    const byLocation = samples.reduce((acc, sample) => {
      acc[sample.location] = (acc[sample.location] || 0) + 1;
      return acc;
    }, {});

    res.json({ total, byOrganism, byLocation });
  } catch (err) {
    next(err);
  }
});

router.get("/report", async (req, res, next) => {
  try {
    const samples = getAllSamples();
    const total = samples.length;
    const uniqueOrganisms = [...new Set(samples.map((sample) => sample.organism))].length;
    const uniqueLocations = [...new Set(samples.map((sample) => sample.location))].length;
    const byOrganism = samples.reduce((acc, sample) => {
      acc[sample.organism] = (acc[sample.organism] || 0) + 1;
      return acc;
    }, {});
    const byLocation = samples.reduce((acc, sample) => {
      acc[sample.location] = (acc[sample.location] || 0) + 1;
      return acc;
    }, {});
    const recentSamples = samples.slice(0, 5).map(({ id, name, organism, collectedAt, location }) => ({
      id,
      name,
      organism,
      collectedAt,
      location,
    }));

    res.json({
      total,
      uniqueOrganisms,
      uniqueLocations,
      byOrganism,
      byLocation,
      recentSamples,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", (req, res, next) => {
  try {
    const { organism, location } = req.query;
    const samples = getAllSamples({ organism, location });
    res.json(samples);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const sample = getSampleById(req.params.id);

    if (!sample) {
      return res.status(404).json({ error: "Amostra não encontrada" });
    }

    res.json(sample);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateSampleCreate, (req, res, next) => {
  try {
    const { name, organism, collectedAt, location, notes } = req.body;
    const newSample = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name,
      organism,
      collectedAt: collectedAt || new Date().toISOString().split("T")[0],
      location: location || "Desconhecido",
      notes: notes || "",
    };

    const created = createSample(newSample);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateSampleUpdate, (req, res, next) => {
  try {
    const updates = req.body;
    const updated = updateSample(req.params.id, updates);

    if (!updated) {
      return res.status(404).json({ error: "Amostra não encontrada" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const removedSample = deleteSample(req.params.id);

    if (!removedSample) {
      return res.status(404).json({ error: "Amostra não encontrada" });
    }

    res.json({ message: "Amostra removida", sample: removedSample });
  } catch (err) {
    next(err);
  }
});

export default router;

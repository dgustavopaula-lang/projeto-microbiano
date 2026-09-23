import Database from "better-sqlite3";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../data/database.db");
const jsonSeedPath = path.resolve(__dirname, "../data/samples.json");

function openDatabase() {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db
    .prepare(
      `CREATE TABLE IF NOT EXISTS samples (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        organism TEXT NOT NULL,
        collectedAt TEXT NOT NULL,
        location TEXT NOT NULL,
        notes TEXT
      )`
    )
    .run();
  return db;
}

const db = openDatabase();

async function migrateFromJson() {
  try {
    await fs.access(jsonSeedPath);
  } catch {
    return;
  }

  const count = db.prepare("SELECT COUNT(*) AS count FROM samples").get().count;
  if (count > 0) return;

  const raw = await fs.readFile(jsonSeedPath, "utf8");
  const samples = JSON.parse(raw || "[]");
  const insert = db.prepare(
    "INSERT OR IGNORE INTO samples (id, name, organism, collectedAt, location, notes) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const insertMany = db.transaction((items) => {
    for (const sample of items) {
      insert.run(sample.id, sample.name, sample.organism, sample.collectedAt, sample.location, sample.notes || "");
    }
  });

  insertMany(samples);
}

await migrateFromJson();

function buildFilterQuery({ organism, location } = {}) {
  const conditions = [];
  const params = [];

  if (organism) {
    conditions.push("LOWER(organism) LIKE ?");
    params.push(`%${organism.toLowerCase()}%`);
  }

  if (location) {
    conditions.push("LOWER(location) LIKE ?");
    params.push(`%${location.toLowerCase()}%`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return { whereClause, params };
}

export function getAllSamples(filters = {}) {
  const { whereClause, params } = buildFilterQuery(filters);
  return db.prepare(`SELECT * FROM samples ${whereClause} ORDER BY collectedAt DESC`).all(...params);
}

export function getSampleById(id) {
  return db.prepare("SELECT * FROM samples WHERE id = ?").get(id);
}

export function createSample(sample) {
  db.prepare(
    "INSERT INTO samples (id, name, organism, collectedAt, location, notes) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(sample.id, sample.name, sample.organism, sample.collectedAt, sample.location, sample.notes || "");
  return getSampleById(sample.id);
}

export function updateSample(id, updates) {
  const existing = getSampleById(id);
  if (!existing) return null;

  const merged = {
    ...existing,
    ...updates,
  };

  db.prepare(
    "UPDATE samples SET name = ?, organism = ?, collectedAt = ?, location = ?, notes = ? WHERE id = ?"
  ).run(merged.name, merged.organism, merged.collectedAt, merged.location, merged.notes || "", id);

  return getSampleById(id);
}

export function deleteSample(id) {
  const deleted = getSampleById(id);
  if (!deleted) return null;
  db.prepare("DELETE FROM samples WHERE id = ?").run(id);
  return deleted;
}

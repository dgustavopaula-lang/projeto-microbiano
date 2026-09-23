export function validateSampleCreate(req, res, next) {
  const { name, organism, collectedAt, location, notes } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Campo obrigatório inválido: name" });
  }

  if (!organism || typeof organism !== "string") {
    return res.status(400).json({ error: "Campo obrigatório inválido: organism" });
  }

  if (collectedAt && typeof collectedAt !== "string") {
    return res.status(400).json({ error: "Campo inválido: collectedAt deve ser string" });
  }

  if (location && typeof location !== "string") {
    return res.status(400).json({ error: "Campo inválido: location deve ser string" });
  }

  if (notes && typeof notes !== "string") {
    return res.status(400).json({ error: "Campo inválido: notes deve ser string" });
  }

  next();
}

export function validateSampleUpdate(req, res, next) {
  const { name, organism, collectedAt, location, notes } = req.body;

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({ error: "Campo inválido: name deve ser string" });
  }

  if (organism !== undefined && typeof organism !== "string") {
    return res.status(400).json({ error: "Campo inválido: organism deve ser string" });
  }

  if (collectedAt !== undefined && typeof collectedAt !== "string") {
    return res.status(400).json({ error: "Campo inválido: collectedAt deve ser string" });
  }

  if (location !== undefined && typeof location !== "string") {
    return res.status(400).json({ error: "Campo inválido: location deve ser string" });
  }

  if (notes !== undefined && typeof notes !== "string") {
    return res.status(400).json({ error: "Campo inválido: notes deve ser string" });
  }

  next();
}

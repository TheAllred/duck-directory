const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("directory").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all ducks." });
  }
};

const createNew = async (req, res, next) => {
  const newDuck = {
    full_name: req.body.full_name,
    color: req.body.color,
    job: req.body.job,
    size: req.body.size,
    material: req.body.material,
    weight: req.body.weight,
    floatability: req.body.floatability,
    features: req.body.features,
    accessories: req.body.accessories,
    fun_fact: req.body.fun_fact,
  };

  const schema = {
    full_name: (value) =>
      /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value),
    color: (value) => /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value),
    job: (value) => /^[A-Za-z\s]+$/.test(value),
    size: (value) => /^(Small|Medium|Large)$/.test(value),
    material: (value) => /^[A-Za-z\s]+$/.test(value),
    weight: (value) => /^[A-Za-z\s]+$/.test(value),
    floatability: (value) => /^[A-Za-z\s]+$/.test(value),
    features: (value) =>
      Array.isArray(value) && value.every((item) => /^[A-Za-z\s]+$/.test(item)),
    accessories: (value) =>
      Array.isArray(value) && value.every((item) => /^[A-Za-z\s]+$/.test(item)),
    fun_fact: (value) => /^[A-Za-z\s,.']+$/.test(value),
  };

  const validate = (object, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => new Error(`${key} is invalid.`));

  const errors = validate(newDuck, schema);

  if (errors.length > 0) {
    res.status(400).json(response.error || "Invalid Inputs");
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("directory")
        .insertOne(newContact);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new duck.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create Duck." });
    }
  }
};

const updateDuck = async (req, res, next) => {
  const updatedDuck = {
    full_name: req.body.full_name,
    color: req.body.color,
    job: req.body.job,
    size: req.body.size,
    material: req.body.material,
    weight: req.body.weight,
    floatability: req.body.floatability,
    features: req.body.features,
    accessories: req.body.accessories,
    fun_fact: req.body.fun_fact,
  };

  const schema = {
    full_name: (value) =>
      /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value),
    color: (value) => /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value),
    job: (value) => /^[A-Za-z\s]+$/.test(value),
    size: (value) => /^(Small|Medium|Large)$/.test(value),
    material: (value) => /^[A-Za-z\s]+$/.test(value),
    weight: (value) => /^[A-Za-z\s]+$/.test(value),
    floatability: (value) => /^[A-Za-z\s]+$/.test(value),
    features: (value) =>
      Array.isArray(value) && value.every((item) => /^[A-Za-z\s]+$/.test(item)),
    accessories: (value) =>
      Array.isArray(value) && value.every((item) => /^[A-Za-z\s]+$/.test(item)),
    fun_fact: (value) => /^[A-Za-z\s,.']+$/.test(value),
  };

  const validate = (object, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => new Error(`${key} is invalid.`));

  const errors = validate(updatedDuck, schema);

  if (errors.length > 0) {
    res.status(400).json(response.error || "Invalid Inputs");
  } else {
    try {
      const duckId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("directory")
        .replaceOne({ _id: duckId }, updatedDuck);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update duck." });
    }
  }
};
const deleteDuck = async (req, res, next) => {
  try {
    const duckId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("directory")
      .deleteOne({ _id: duckId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete duck." });
  }
};

module.exports = { getAll, createNew, updateDuck, deleteDuck };

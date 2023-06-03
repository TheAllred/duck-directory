const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("hunters").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all hunters." });
  }
};

const createNew = async (req, res, next) => {
  const newHunter = {
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
  if (
    !req.body.full_name ||
    !req.body.color ||
    !req.body.job ||
    !req.body.size ||
    !req.body.material ||
    !req.body.weight ||
    !req.body.floatability ||
    !req.body.features ||
    !req.body.accessories ||
    !req.body.fun_fact
  ) {
    res.status(400).json({ message: "Failed to create hunter." });
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
          .json(response.error || "Error occurred while creating new hunter.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create hunter." });
    }
  }
};

const updateHunter = async (req, res, next) => {
  const updatedhunter = {
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
  if (
    !req.body.full_name ||
    !req.body.color ||
    !req.body.job ||
    !req.body.size ||
    !req.body.material ||
    !req.body.weight ||
    !req.body.floatability ||
    !req.body.features ||
    !req.body.accessories ||
    !req.body.fun_fact
  ) {
    res.status(400).json({ message: "Failed to create hunter." });
  } else {
    try {
      const hunterId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("directory")
        .replaceOne({ _id: hunterId }, updatedHunter);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update hunter." });
    }
  }
};

const deleteHunter = async (req, res, next) => {
  try {
    const hunterId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("directory")
      .deleteOne({ _id: hunterId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete hunter." });
  }
};

module.exports = { getAll, createNew, updateHunter, deleteHunter };

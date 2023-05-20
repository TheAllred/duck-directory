const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("directory").find();
  const lists = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(lists);
};

const createNew = async (req, res, next) => {
  const newContact = {
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
        .json(response.error || "Error occurred while creating new contact.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create contact." });
  }
};

module.exports = { getAll, createNew };

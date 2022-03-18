const { Schema, model } = require("mongoose");

const CensusSchema = new Schema({
  REGION: {
    type: String,
    require: true,
  },
  DISTRICT: {
    type: String,
    require: true,
  },
  DISTRICTCODE: {
    type: String,
    require: true,
  },
  TA_NAME: {
    type: String,
    require: true,
  },
  DISTCODE: {
    type: Number,
    require: true,
  },
  TOTAL_POP: {
    type: Number,
    require: true,
  },
  MALE: {
    type: Number,
    require: true,
  },
  FEMALE: {
    type: Number,
  },
  HOUSEHOLDS: {
    type: Number,
    require: true,
  },
  HH_SIZE: {
    type: Number,
    require: true,
  },
});

module.exports = model("Census", CensusSchema);

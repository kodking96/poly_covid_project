const { Schema, model } = require("mongoose");

const CovidCaseSchema = new Schema({
  province: {
    type: String,
  },
  Country: {
    type: String,
    require: true,
  },
  Lat: {
    type: Number,
    require: true,
  },
  Long: {
    type: Number,
    require: true,
  },
  cases: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

module.exports = model("CovidCase", CovidCaseSchema);

const fetch = require("node-fetch");
const axios = require("axios");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const censusRoute = require("./routes/census");
const casesRoute = require("./routes/cases");

//let dbUrl = "mongodb://localhost/dataviz";

const cors = require("cors");

const app = express();

// PORT addition for heroku to detect
//const PORT = process.env.PORT || 7070;

//const { connect, connection } = require("mongoose");

// connect(
//   process.env.MONGO_URI || dbUrl,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/census", censusRoute);
app.use("/api/cases", casesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(4000, () => {
  console.log(`Backend server is running!`);
});

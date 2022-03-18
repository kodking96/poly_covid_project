const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const northData = await pool.query(
      "SELECT * FROM census WHERE region = 'North'"
    );
    const centralData = await pool.query(
      "SELECT * FROM census WHERE region = 'Central'"
    );
    const southData = await pool.query(
      "SELECT * FROM census WHERE region = 'South'"
    );
    const northRegional = getRegionalData(northData.rows, "North");
    const centralRegional = getRegionalData(centralData.rows, "Central");
    const southRegional = getRegionalData(southData.rows, "South");
    res.json([northRegional, centralRegional, southRegional]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:region", async (req, res) => {
  console.log(req.params.region);
  try {
    const dataRegion = await pool.query(
      `SELECT * FROM census WHERE region = '${req.params.region}'`
    );
    let districts = new Set();

    let currentRegion = [...dataRegion.rows];

    currentRegion.map((item) => {
      districts.add(item.district);
    });
    districts = [...districts];

    let distData = [];
    districts.map((district) => {
      let TOTAL_POP = 0;
      let MALE = 0;
      let FEMALE = 0;
      let HOUSEHOLDS = 0;
      let HH_SIZE = 0.0;
      let num = 0;

      currentRegion.map((item) => {
        if (district === item.district) {
          TOTAL_POP += item.total_pop;
          MALE += item.male;
          FEMALE += item.female;
          HOUSEHOLDS += item.households;
          HH_SIZE += item.hh_size;
          num += 1;
        }
      });
      HH_SIZE = HH_SIZE / num;
      HH_SIZE = HH_SIZE.toFixed(2);
      distData.push({
        district: district,
        TOTAL_POP,
        MALE,
        FEMALE,
        HOUSEHOLDS,
        HH_SIZE,
      });
    });

    res.json(distData);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getRegionalData = (items, name) => {
  let TOTAL_POP = 0;
  let MALE = 0;
  let FEMALE = 0;
  let HOUSEHOLDS = 0;
  let HH_SIZE = 0.0;

  items.map((item) => {
    TOTAL_POP += item.total_pop;
    MALE += item.male;
    FEMALE += item.female;
    HOUSEHOLDS += item.households;
    HH_SIZE += item.hh_size;
  });

  HH_SIZE = HH_SIZE / items.length;
  HH_SIZE = HH_SIZE.toFixed(2);

  return { TOTAL_POP, MALE, FEMALE, HOUSEHOLDS, HH_SIZE };
};

module.exports = router;

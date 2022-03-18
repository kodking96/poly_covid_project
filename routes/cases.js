const router = require("express").Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    // Use Promise.all because it takes a very long time to process
    console.log(req.body.dateRange);
    let data = await Promise.all(
      req.body.countries.map(async (country) => {
        {
          let dat = await pool.query(
            `SELECT * FROM covid WHERE country = '${country}' AND date BETWEEN '${req.body.dateRange[0]}' AND '${req.body.dateRange[1]}' ORDER BY date`
          );
          let dt = [...dat.rows];

          let cases = dt.map((item) => {
            return item.cases;
          });
          let dates = dt.map((item) => {
            return item.date;
          });
          let k = { name: country, data: cases, categories: dates };
          return k;
        }
      })
    );
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    let data = await CovidCase.find();
    let countries = data.map((dt) => {
      return dt.Country;
    });
    countries = new Set(countries);
    countries = [...countries];
    countries = countries.sort((a, b) => (a.district < b.district ? -1 : 1));
    res.json(countries);
  } catch (err) {
    res / status(500).json(err);
  }
});

module.exports = router;

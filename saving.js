const pool = require("./db");
const fetch = require("node-fetch");

const dataUrl = "http://localhost:8000/census";
const covidUrl = "http://localhost:8200/cases";

const fetchData = async (url, name) => {
  let data = await fetch(url, { method: "GET" })
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  //console.log(data);
  console.log(`Done fetching the ${name} data`);
  return data;
};

const saveCensusDataToDB = async () => {
  console.log("Saving Census Data To DB");
  let data = await fetchData(dataUrl, "Census Data").then((data) => data);
  data.map(async (censusData) => {
    try {
      let newCensus = await pool.query(
        "INSERT INTO census (region, district, distcode, ta_name, eacode, total_pop, male, female, households, hh_size) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [
          censusData.REGION,
          censusData.DISTRICT,
          censusData.DISTCODE,
          censusData.TA_NAME,
          censusData.EACODE,
          parseInt(censusData.TOTAL_POP.replace(/,/g, "")),
          parseInt(censusData.MALE.replace(/,/g, "")),
          parseInt(censusData.FEMALE.replace(/,/g, "")),
          parseInt(censusData.HOUSEHOLDS.replace(/,/g, "")),
          parseFloat(censusData.HH_SIZE),
        ]
      );
      console.log(newCensus.rows);
    } catch (err) {
      console.log(err.message);
    }
  });
};

const saveCovidCasesDataToDB = async () => {
  let data = await fetchData(covidUrl, "Covid Cases Data")
    .then((data) => data)
    .catch((err) => console.log(err));
  data.map(async (currentData) => {
    let { Long, Lat, ...dates } = currentData;
    let Country;
    let Province;
    for (key in dates) {
      if (key == "Province/State") {
        Province = dates[key];
        continue;
      }
      if (key == "Country/Region") {
        if (Province == null || Province == undefined) {
          Country = dates[key];
        } else {
          Country = `${dates[key]} (${Province})`;
        }
        continue;
      }

      let k = key.split("/");
      let date = `20${k[2]}-${k[0]}-${k[1]}T00:00:00.000Z`;
      try {
        let newCovidCase = await pool.query(
          "INSERT INTO covid (country, lat, long, cases, date) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [
            Country,
            parseFloat(Lat),
            parseFloat(Long),
            parseInt(dates[key]),
            date,
          ]
        );
        console.log(newCovidCase.rows[0]);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

saveCovidCasesDataToDB();
//saveCensusDataToDB();

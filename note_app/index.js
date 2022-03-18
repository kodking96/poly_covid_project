const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get("/census", async (req, res) => {
  const allCensus = await pool.query(
    "SELECT * FROM census ORDER BY eacode ASC"
  );
  res.json(allCensus.rows);
});

// ROUTES

// create a todo
/*
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
  }
});

// get a to do
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
*/

// let dt = new Date(Date.UTC(2021, 0, 22, 0, 0, 0));

// app.get("/cases", async (req, res) => {
//   let country = "Malawi";
//   const allCases = await pool.query(
//     `SELECT * FROM covid WHERE country = '${country}' ORDER BY date`
//   );
//   //allCases.rows.map()
//   res.json(allCases.rows);
//   console.log(allCases.rows[0].date.getFullYear());
//   console.log(allCases.rows[0].date.getMonth());
//   console.log(allCases.rows[0].date.getDate());
//   console.log(allCases.rows[0].date);
//   console.log(allCases.rows[0].date.getUTCHours());
//   console.log(allCases.rows[0]);
// });

app.get("/", async (req, res) => {
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

app.get("/:region", async (req, res) => {
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

app.post("/", async (req, res) => {
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

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

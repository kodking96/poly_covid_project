import React from "react";
import CountrySelector from "./components/CountrySelector";
import DateRangeSelector from "./components/DateRangeSelector";

import CovidLineChart from "./components/CovidLineChart";
import CovidLabelController from "./components/CovidLabelController";
import { Grid } from "@material-ui/core";

export default function CovidTimeSeriesChart() {
  return (
    <div>
      <Grid container>
        <Grid item sm={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2px",
              paddingLeft: "10px",
            }}
          >
            <div style={{ marginRight: "150px" }}>
              <CountrySelector />
            </div>
            <div>
              <CovidLabelController />
            </div>
          </div>
        </Grid>
        <Grid item sm={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "20px",
            }}
          >
            <DateRangeSelector />
          </div>
        </Grid>
      </Grid>
      <CovidLineChart />
    </div>
  );
}

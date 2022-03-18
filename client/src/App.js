import React from "react";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TopBar from "./components/TopBar/TopBar";
import CovidTimeSeriesChart from "./components/CovidTimeSeriesChart/CovidTimeSeriesChart";
import CensusCountryChart from "./components/CensusCountryChart/CensusCountryChart";
import CensusRegionalChart from "./components/CensusRegionalChart/CensusRegionalChart";
import CensusRegionalTable from "./components/CensusRegionalTable/CensusRegionalTable";

import { CovidContextProvider } from "./contexts/CovidContext";
import { CensusContextProvider } from "./contexts/CensusContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "99vw",
  },
  base: {
    height: "40vh",
    width: "100%",
    marginBottom: "25px",
  },
  paper: {
    height: "100%",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <TopBar />
      <CensusContextProvider>
        <CovidContextProvider>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item sm={12} md={6} className={classes.base}>
              <Paper elevation={1} className={classes.paper}>
                <div className={classes.base}>
                  <CovidTimeSeriesChart />
                </div>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6} className={classes.base}>
              <Paper elevation={1} className={classes.paper}>
                <div className={classes.base}>
                  <CensusCountryChart />
                </div>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6} className={classes.base}>
              <Paper elevation={1} className={classes.paper}>
                <div className={classes.base}>
                  <CensusRegionalChart />
                </div>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6} className={classes.base}>
              <Paper elevation={3} className={classes.paper}>
                <div className={classes.base}>
                  <CensusRegionalTable />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </CovidContextProvider>
      </CensusContextProvider>
    </div>
  );
};

export default App;

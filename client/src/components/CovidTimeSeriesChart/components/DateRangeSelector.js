import "date-fns";
import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import { CovidContext } from "../../../contexts/CovidContext";

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [startDate, setStartDate] = React.useState(
    new Date(Date.UTC(2020, 0, 22, 0, 0, 0))
  );
  const [endDate, setEndDate] = React.useState(
    new Date(Date.UTC(2021, 5, 15, 0, 0, 0))
  );
  const { setDateRange } = useContext(CovidContext);

  const handleStartChange = (date) => {
    setStartDate(date);
  };
  const handleEndChange = (date) => {
    setEndDate(date);
  };
  const handleClick = () => {
    setDateRange([startDate, endDate]);
    // console.log(`Start Date: ${startDate}\n${endDate}`);
  };
  const handleAll = () => {
    setDateRange([
      new Date(Date.UTC(2020, 0, 22, 0, 0, 0)),
      new Date(Date.UTC(2021, 5, 15, 0, 0, 0)),
    ]);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <KeyboardDatePicker
              margin="normal"
              id="start"
              label="Select Start Date"
              format="dd/MM/yyyy"
              value={startDate}
              onChange={handleStartChange}
              KeyboardButtonProps={{
                "aria-label": "start date",
              }}
              size="small"
              style={{ width: "150px", marginRight: "2px" }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="end"
              label="Select End Date"
              format="dd/MM/yyyy"
              value={endDate}
              onChange={handleEndChange}
              KeyboardButtonProps={{
                "aria-label": "end date",
              }}
              size="small"
              style={{ width: "150px" }}
            />
          </div>
          <div>
            <Button variant="outlined" color="primary" onClick={handleClick}>
              OK
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "2px" }}
              onClick={handleAll}
            >
              ALL
            </Button>
          </div>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

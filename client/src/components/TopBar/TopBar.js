import React, { useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { init } from "ityped";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function TopBar() {
  const textRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 10,
      strings: [
        "Data Visualization",
        "1. Covid cases from all over the world starting from January 2020, with customization options for nations, dates and labels",
        "2. 2018 Malawi census data for all 3 regions",
        "3. 2018 Malawi census data for region of choice with labels customization",
        "4. 2018 Malawi census data table for a specified region",
      ],
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h5" align="center">
            <span ref={textRef}></span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

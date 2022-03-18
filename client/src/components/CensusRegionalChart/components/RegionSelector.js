import React, { useState, useContext } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { CensusContext } from "../../../contexts/CensusContext";
import { Button } from "@material-ui/core";

export default function RegionSelector() {
  const { setRegion } = useContext(CensusContext);
  const [region, setAlignment] = useState("North");

  const changeRegion = (event, newRegion) => {
    setAlignment(newRegion);
    setRegion(newRegion);
  };

  return (
    <ToggleButtonGroup
      value={region}
      exclusive
      onChange={changeRegion}
      aria-label="Select Region"
      size="small"
    >
      <ToggleButton value="North" aria-label="North Region">
        <Button variant="contained" color="primary">
          North
        </Button>
      </ToggleButton>
      <ToggleButton value="Central" aria-label="Central Region">
        <Button variant="contained" color="primary">
          Central
        </Button>
      </ToggleButton>
      <ToggleButton value="South" aria-label="South Region">
        <Button variant="contained" color="primary">
          South
        </Button>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

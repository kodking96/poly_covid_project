import React, { useContext, useState } from "react";
import { CensusContext } from "../../../contexts/CensusContext";
import { Button } from "@material-ui/core";

const RegionalLabelController = () => {
  const { showLabels, setShowLabels } = useContext(CensusContext);
  const [text, setText] = useState("Hide Labels");
  const handleClick = () => {
    setShowLabels(!showLabels);
    setText(showLabels ? "Show Labels" : "Hide Labels");
  };
  return (
    <Button variant="outlined" color="primary" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default RegionalLabelController;

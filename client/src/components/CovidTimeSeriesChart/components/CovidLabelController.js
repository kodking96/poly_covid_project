import React, { useContext, useState } from "react";
import { CovidContext } from "../../../contexts/CovidContext";
import { Button } from "@material-ui/core";

const CovidLabelController = () => {
  const { showLabels, setShowLabels } = useContext(CovidContext);
  const [text, setText] = useState("Show Labels");
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

export default CovidLabelController;

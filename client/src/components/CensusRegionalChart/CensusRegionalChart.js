import React from "react";
import RegionSelector from "./components/RegionSelector";
import RegionalBarChart from "./components/RegionalBarChart";
import RegionalLabelController from "./components/RegionalLabelController";

const CensusRegionalChart = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2px",
          paddingLeft: "10px",
        }}
      >
        <RegionSelector />
        <RegionalLabelController />
      </div>
      <RegionalBarChart />
    </div>
  );
};

export default CensusRegionalChart;

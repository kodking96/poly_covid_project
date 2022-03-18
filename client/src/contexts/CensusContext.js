import React, { useState, useEffect, createContext } from "react";

export const CensusContext = createContext();

export const CensusContextProvider = ({ children }) => {
  const [region, setRegion] = useState("North");
  const [series, setSeries] = useState([]);
  const [showLabels, setShowLabels] = useState(true);
  const [labels, setLabels] = useState(true);
  const [rows, setRows] = useState([]);

  function createData(district, TOTAL_POP, MALE, FEMALE, HOUSEHOLDS, HH_SIZE) {
    return { district, TOTAL_POP, MALE, FEMALE, HOUSEHOLDS, HH_SIZE };
  }

  useEffect(() => {
    fetch(`http://localhost:4000/api/census/${region}`, { method: "GET" })
      .then((censusData) => censusData.json())
      .then((censusData) => {
        let rowsData = censusData.map((dt) => {
          return createData(
            dt.district,
            dt.TOTAL_POP,
            dt.MALE,
            dt.FEMALE,
            dt.HOUSEHOLDS,
            dt.HH_SIZE
          );
        });
        rowsData.sort((a, b) => (a.district < b.district ? -1 : 1));
        setRows(rowsData);

        let TOTAL_POP = [];
        let MALE = [];
        let FEMALE = [];
        let HOUSEHOLDS = [];
        let HH_SIZE = [];
        let districts = [];
        setRows(censusData);
        censusData.map((dt) => {
          TOTAL_POP.push(dt.TOTAL_POP);
          MALE.push(dt.MALE);
          FEMALE.push(dt.FEMALE);
          HOUSEHOLDS.push(dt.HOUSEHOLDS);
          HH_SIZE.push(dt.HH_SIZE);
          districts.push(dt.district);
          return null;
        });
        setLabels(districts);
        setSeries([
          { name: "TOTAL_POP", data: TOTAL_POP },
          { name: "MALE", data: MALE },
          { name: "FEMALE", data: FEMALE },
          { name: "HOUSEHOLDS", data: HOUSEHOLDS },
          { name: "HH_SIZE", data: HH_SIZE },
        ]);
      });
  }, [region]);

  return (
    <CensusContext.Provider
      value={{
        series,
        setSeries,
        region,
        setRegion,
        showLabels,
        setShowLabels,
        labels,
        setLabels,
        rows,
        setRows,
      }}
    >
      {children}
    </CensusContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";

export const CovidContext = createContext();

export const CovidContextProvider = ({ children }) => {
  const [countries, setCountries] = useState(["Malawi"]);
  const [showLabels, setShowLabels] = useState(false);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dateRange, setDateRange] = useState(["2020-01-22", "2021-06-15"]);

  useEffect(() => {
    console.log(dateRange);
    fetch("http://localhost:4000/api/cases", {
      method: "POST",
      body: JSON.stringify({ countries: countries, dateRange: dateRange }),
      headers: { "Content-Type": "application/json" },
    })
      .then((casesData) => casesData.json())
      .then(async (casesData) => {
        let catg = casesData[0].categories;
        let cat = catg.map((cg) => {
          let a = cg.split("T");
          let b = a[0].split("-");
          let theDate = new Date(
            Date.UTC(b[0], parseInt(b[1]) - 1, parseInt(b[2]) + 1, 0, 0, 0)
          );
          return theDate.toUTCString();
        });
        console.log(cat);
        setCategories(cat);
        setSeries(casesData);
      });
  }, [countries, dateRange]);
  return (
    <CovidContext.Provider
      value={{
        series,
        setSeries,
        categories,
        setCategories,
        countries,
        setCountries,
        dateRange,
        setDateRange,
        showLabels,
        setShowLabels,
      }}
    >
      {children}
    </CovidContext.Provider>
  );
};

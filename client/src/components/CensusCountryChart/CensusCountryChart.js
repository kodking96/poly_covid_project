import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const CensusCountryChart = () => {
  const [series, setSeries] = useState([]);
  const options = {
    title: {
      text: "Malawi 2018 Census",
      align: "center",
      style: {
        fontSize: "30px",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "75%",
        endingShape: "flat",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -25,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: ["Men", "Women", "HouseHolds", "HH"],
    },
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/census", { method: "GET" })
      .then((censusData) => censusData.json())
      .then((censusData) =>
        setSeries([
          {
            name: "North",
            data: [
              censusData[0].MALE,
              censusData[0].FEMALE,
              censusData[0].HOUSEHOLDS,
              censusData[0].HH_SIZE,
            ],
          },
          {
            name: "Central",
            data: [
              censusData[1].MALE,
              censusData[1].FEMALE,
              censusData[1].HOUSEHOLDS,
              censusData[1].HH_SIZE,
            ],
          },
          {
            name: "South",
            data: [
              censusData[2].MALE,
              censusData[2].FEMALE,
              censusData[2].HOUSEHOLDS,
              censusData[2].HH_SIZE,
            ],
          },
        ])
      );
  }, []);

  //console.log(series);
  return (
    <ReactApexChart
      series={series}
      options={options}
      type="bar"
      height="100%"
      width="100%"
    />
  );
};

export default CensusCountryChart;

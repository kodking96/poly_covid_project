import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { CensusContext } from "../../../contexts/CensusContext";

const RegionalBarChart = () => {
  const { series, labels, showLabels, region } = useContext(CensusContext);

  const options = {
    chart: {
      zoom: {
        enabled: true,
      },
    },
    title: {
      text:
        region === "Central"
          ? `Malawi 2018 ${region} Region Census`
          : `Malawi 2018 ${region}ern Region Census`,
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
      enabled: showLabels,
      offsetY: -35,
      style: {
        fontSize: "10px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: labels,
      tickPlacement: "on",
    },
  };

  //console.log(series);
  return (
    <ReactApexChart
      series={series}
      options={options}
      type="bar"
      height="400px"
      width="100%"
    />
  );
};

export default RegionalBarChart;

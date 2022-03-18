import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { CovidContext } from "../../../contexts/CovidContext";

export default function CovidLineChart() {
  const { series, categories, showLabels } = useContext(CovidContext);

  const config = {
    options: {
      dataLabels: { enabled: showLabels },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      legend: {
        show: true,
        showForSingleSeries: true,
      },
      title: {
        text: "Covid Cases Over A Specified Period",
        align: "center",
        style: {
          fontSize: "30px",
        },
      },
      xaxis: {
        type: "datetime",
        categories: categories,
        title: {
          text: "Date",
          style: {
            fontSize: "20px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number Of Cases",
          style: {
            fontSize: "20px",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={config.options}
      series={series}
      type="line"
      height="100%"
      width="100%"
    />
  );
}

"use client";

import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  isStacked: true,
  legend: "none",
  vAxis: { minValue: 0 },
};

export function DailySales() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

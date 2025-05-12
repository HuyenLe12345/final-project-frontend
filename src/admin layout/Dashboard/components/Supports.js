import React from "react";
import Chart from "react-apexcharts";
import Card from "../../../Shared/Card";
const Supports = ({ title, value }) => {
  // Chart options
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Tiền", "Quần áo", "Sách"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Tổng",
              formatter: () => value?.total ?? "",
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Series data
  const series = [
    value?.moneySupports ?? 0,
    value?.clothesSupports ?? 0,
    value?.bookSupports ?? 0,
  ];

  return (
    <Card className="py-2" formName="support-chart mx-0">
      <h5 className="text-secondary">{title}</h5>

      <Chart options={options} series={series} type="donut" width="300" />
    </Card>
  );
};

export default Supports;

import Chart, { ChartConfiguration } from "chart.js/auto";
import { SHINDO, earthquakeData } from "./earthquakeData";

// Define chart configuration
const chartConfig: ChartConfiguration<"bar", number[], string> = {
  type: "bar",
  data: {
    labels: [...earthquakeData.map((data) => data.period)],
    // datasets: [
    // {
    //   label: SHINDO.SHINDO_4,
    //   data: [
    //     ...earthquakeData.map((data) => data.intensities[SHINDO.SHINDO_4]),  // [3, 85, 91...]
    //   ],
    //   borderWidth: 1,
    // },
    // {
    //   label: SHINDO.SHINDO_5_WEAK,
    //   data: [
    //     ...earthquakeData.map(
    //       (data) => data.intensities[SHINDO.SHINDO_5_WEAK]
    //     ),
    //   ],
    //   borderWidth: 1,
    // },
    // {
    //   label: SHINDO.SHINDO_5_STRONG,
    //   data: [
    //     ...earthquakeData.map(
    //       (data) => data.intensities[SHINDO.SHINDO_5_STRONG]
    //     ),
    //   ],
    //   borderWidth: 1,
    // },
    // ],
    datasets: [
      ...Object.values(SHINDO).map((v) => {
        return {
          label: v,
          data: [...earthquakeData.map((data) => data.intensities[v])],
          borderWidth: 1,
        };
      }),
    ],
  },
  options: {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  },
};

let chart: Chart | undefined;

// Function to generate chart
const generateChart = (
  config: ChartConfiguration<"bar", number[], string>
): Chart => {
  if (chart) {
    chart.destroy();
  }
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;
  chart = new Chart(ctx, config);

  return chart;
};

// Generate the initial chart
generateChart(chartConfig);

// Re-generate the chart on window resize
addEventListener("resize", () => {
  console.log("resize");
  generateChart(chartConfig);
});

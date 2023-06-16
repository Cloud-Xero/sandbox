import Chart, { ChartConfiguration } from "chart.js/auto";

// Define chart configuration
const chartConfig: ChartConfiguration<"bar", number[], string> = {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
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
  chart = new Chart(ctx!, config);

  return chart;
};

// Generate the initial chart
generateChart(chartConfig);

// Re-generate the chart on window resize
addEventListener("resize", () => {
  console.log("resize");
  generateChart(chartConfig);
});

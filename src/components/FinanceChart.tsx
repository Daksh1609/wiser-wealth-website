
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface FinanceChartProps {
  fixedExpenses: number;
  variableExpenses: number;
  investments: number;
  income: number;
  currency: string;
}

const FinanceChart = ({
  fixedExpenses,
  variableExpenses,
  investments,
  income,
  currency,
}: FinanceChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    setIsChartReady(true);
  }, []);

  useEffect(() => {
    if (!isChartReady || !chartRef.current) return;

    // Register Chart.js DataLabels plugin
    Chart.register(ChartDataLabels);

    // Calculate savings
    const savings = income - (fixedExpenses + variableExpenses + investments);

    // Prepare data for the chart
    const data = {
      labels: ["Fixed Expenses", "Variable Expenses", "Investments", "Savings"],
      datasets: [
        {
          data: [
            fixedExpenses,
            variableExpenses,
            investments,
            savings > 0 ? savings : 0,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const config = {
      type: "pie" as const,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom" as const,
            labels: {
              padding: 20,
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.raw;
                const percentage = ((value / income) * 100).toFixed(1);
                return `${context.label}: ${currency} ${value.toLocaleString()} (${percentage}%)`;
              },
            },
          },
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold' as const, // Fix: Using 'bold' as const instead of string
              size: 12,
            },
            formatter: (value: number) => {
              const percentage = ((value / income) * 100).toFixed(1);
              return `${percentage}%`;
            },
          },
        },
        animation: {
          duration: 1000,
        },
      },
    };

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(chartRef.current, config);

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [fixedExpenses, variableExpenses, investments, income, currency, isChartReady]);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Breakdown</h2>
      <div className="aspect-w-16 aspect-h-9 h-[400px]">
        <canvas ref={chartRef} id="finance-chart" />
      </div>
    </div>
  );
};

export default FinanceChart;

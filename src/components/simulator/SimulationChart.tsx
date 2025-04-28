
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { SimulationItem } from "@/types/simulatorTypes";

interface SimulationChartProps {
  currency: string;
  simulationItems: SimulationItem[];
  originalSavings: number;
  simulatedSavings: number;
}

const SimulationChart = ({ 
  currency, 
  simulationItems, 
  originalSavings, 
  simulatedSavings 
}: SimulationChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!chartRef.current || simulationItems.length === 0) return;
    
    const simulatedIncome = simulationItems.find(item => item.category === "income")?.simulatedAmount || 0;
    const simulatedFixed = simulationItems
      .filter(item => item.category === "fixed")
      .reduce((acc, item) => acc + item.simulatedAmount, 0);
    const simulatedVariable = simulationItems
      .filter(item => item.category === "variable")
      .reduce((acc, item) => acc + item.simulatedAmount, 0);
    const simulatedInvestments = simulationItems
      .filter(item => item.category === "investments")
      .reduce((acc, item) => acc + item.simulatedAmount, 0);
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const categories = ["Income", "Fixed Expenses", "Variable Expenses", "Investments", "Savings"];
    
    const originalData = [
      simulationItems.find(item => item.category === "income")?.originalAmount || 0,
      simulationItems.filter(item => item.category === "fixed").reduce((acc, item) => acc + item.originalAmount, 0),
      simulationItems.filter(item => item.category === "variable").reduce((acc, item) => acc + item.originalAmount, 0),
      simulationItems.filter(item => item.category === "investments").reduce((acc, item) => acc + item.originalAmount, 0),
      originalSavings
    ];
    
    const simulatedData = [
      simulatedIncome,
      simulatedFixed,
      simulatedVariable,
      simulatedInvestments,
      simulatedSavings
    ];
    
    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Original",
            data: originalData,
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Simulated",
            data: simulatedData,
            backgroundColor: "rgba(153, 102, 255, 0.7)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw as number;
                const datasetIndex = context.datasetIndex;
                const index = context.dataIndex;
                
                const originalValue = originalData[index];
                const simulatedValue = simulatedData[index];
                const percentageDiff = ((simulatedValue - originalValue) / originalValue) * 100;
                
                if (datasetIndex === 0) {
                  return `Original: ${currency} ${value.toLocaleString()}`;
                } else {
                  return [
                    `Simulated: ${currency} ${value.toLocaleString()}`,
                    `Difference: ${percentageDiff > 0 ? "+" : ""}${percentageDiff.toFixed(1)}%`
                  ];
                }
              },
            },
          },
          legend: {
            position: "bottom",
          },
          datalabels: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: false,
              callback: function(value) {
                return `${currency} ${value.toLocaleString()}`;
              }
            },
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [simulationItems, originalSavings, simulatedSavings, currency]);
  
  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SimulationChart;

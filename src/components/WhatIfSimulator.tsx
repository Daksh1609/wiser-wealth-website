import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { calculateTotalSavings } from "../utils/calculatorUtils";
import { SimulationItem as SimulationItemType, WhatIfSimulatorProps } from "@/types/simulatorTypes";
import SimulationItem from "./simulator/SimulationItem";
import SimulationChart from "./simulator/SimulationChart";
import SimulationSummary from "./simulator/SimulationSummary";

const BudgetScenarioSimulator = ({
  currency,
  income,
  fixedExpenses,
  variableExpenses,
  investments,
}: WhatIfSimulatorProps) => {
  const [simulationItems, setSimulationItems] = useState<SimulationItemType[]>([]);
  const [originalSavings, setOriginalSavings] = useState(0);
  const [simulatedSavings, setSimulatedSavings] = useState(0);
  
  useEffect(() => {
    const incomeItem: SimulationItemType = {
      id: "income",
      name: "Income",
      originalAmount: income,
      simulatedAmount: income,
      percentage: 100,
      category: "income",
    };
    
    const fixedItems = fixedExpenses.map((item) => ({
      id: item.id,
      name: item.name,
      originalAmount: item.amount,
      simulatedAmount: item.amount,
      percentage: 100,
      category: "fixed" as const,
    }));
    
    const variableItems = variableExpenses.map((item) => ({
      id: item.id,
      name: item.name,
      originalAmount: item.amount,
      simulatedAmount: item.amount,
      percentage: 100,
      category: "variable" as const,
    }));
    
    const investmentItems = investments.map((item) => ({
      id: item.id,
      name: item.name,
      originalAmount: item.amount,
      simulatedAmount: item.amount,
      percentage: 100,
      category: "investments" as const,
    }));
    
    const allItems = [incomeItem, ...fixedItems, ...variableItems, ...investmentItems];
    setSimulationItems(allItems);
    
    const totalFixed = fixedExpenses.reduce((acc, item) => acc + item.amount, 0);
    const totalVariable = variableExpenses.reduce((acc, item) => acc + item.amount, 0);
    const totalInvestments = investments.reduce((acc, item) => acc + item.amount, 0);
    const savings = calculateTotalSavings(income, totalFixed, totalVariable, totalInvestments);
    
    setOriginalSavings(savings);
    setSimulatedSavings(savings);
  }, [income, fixedExpenses, variableExpenses, investments]);
  
  useEffect(() => {
    if (simulationItems.length === 0) return;
    
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
    
    const newSimulatedSavings = calculateTotalSavings(
      simulatedIncome,
      simulatedFixed,
      simulatedVariable,
      simulatedInvestments
    );
    
    setSimulatedSavings(newSimulatedSavings);
  }, [simulationItems]);
  
  const handleSliderChange = (id: string, value: number[]) => {
    const percentage = value[0];
    
    setSimulationItems(prev => 
      prev.map(item => 
        item.id === id 
          ? {
              ...item,
              percentage,
              simulatedAmount: (item.originalAmount * percentage) / 100
            }
          : item
      )
    );
  };
  
  const handleReset = () => {
    setSimulationItems(prev => 
      prev.map(item => ({
        ...item,
        simulatedAmount: item.originalAmount,
        percentage: 100
      }))
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setSimulationItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Budget Scenario Planner</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4 px-2">
        Explore how changes in your income and expenses affect your monthly savings. 
        Slide the bars to simulate different financial scenarios and see the instant impact.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {simulationItems.map((item) => (
            <SimulationItem
              key={item.id}
              item={item}
              currency={currency}
              onSliderChange={handleSliderChange}
            />
          ))}
        </div>
        
        <div className="flex flex-col">
          <SimulationChart
            currency={currency}
            simulationItems={simulationItems}
            originalSavings={originalSavings}
            simulatedSavings={simulatedSavings}
          />
          
          <SimulationSummary
            currency={currency}
            originalSavings={originalSavings}
            simulatedSavings={simulatedSavings}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetScenarioSimulator;

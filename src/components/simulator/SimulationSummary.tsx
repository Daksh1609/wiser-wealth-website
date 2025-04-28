
import React from "react";

interface SimulationSummaryProps {
  currency: string;
  originalSavings: number;
  simulatedSavings: number;
}

const SimulationSummary = ({ currency, originalSavings, simulatedSavings }: SimulationSummaryProps) => {
  const savingsDifference = simulatedSavings - originalSavings;
  const percentageDifference = originalSavings === 0 
    ? 0 
    : (savingsDifference / Math.abs(originalSavings) * 100).toFixed(1);
  
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Simulation Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Original Savings</p>
          <p className="text-lg font-medium">{currency} {originalSavings.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Simulated Savings</p>
          <p className={`text-lg font-medium ${simulatedSavings >= originalSavings ? 'text-green-600' : 'text-red-600'}`}>
            {currency} {simulatedSavings.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Difference</p>
          <p className={`text-base font-bold ${simulatedSavings >= originalSavings ? 'text-green-600' : 'text-red-600'}`}>
            {simulatedSavings >= originalSavings ? '+' : ''}
            {currency} {savingsDifference.toLocaleString()}
            <span className="ml-1 text-sm">
              ({percentageDifference}%)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSummary;

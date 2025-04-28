import { useState } from "react";
import { Slider } from "../ui/slider";
import { SimulationItem as SimulationItemType } from "@/types/simulatorTypes";
import { Input } from "../ui/input";

interface SimulationItemProps {
  item: SimulationItemType;
  currency: string;
  onSliderChange: (id: string, value: number[]) => void;
  onUpdateCustomItem?: (id: string, field: string, value: string | number) => void;
}

const SimulationItem = ({
  item,
  currency,
  onSliderChange,
  onUpdateCustomItem,
}: SimulationItemProps) => {
  const isCustomItem = item.id.startsWith('custom-');
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "income": return "bg-green-50 border border-green-100";
      case "fixed": return "bg-red-50 border border-red-100";
      case "variable": return "bg-blue-50 border border-blue-100";
      case "investments": return "bg-yellow-50 border border-yellow-100";
      default: return "bg-gray-50 border border-gray-100";
    }
  };
  
  const getDotColor = (category: string) => {
    switch (category) {
      case "income": return "bg-green-500";
      case "fixed": return "bg-red-500";
      case "variable": return "bg-blue-500";
      case "investments": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };
  
  const getPercentageColor = () => {
    const isIncomeOrInvestment = item.category === "income" || item.category === "investments";
    const percentage = (item.simulatedAmount / item.originalAmount * 100) - 100;

    if (isIncomeOrInvestment) {
      return percentage >= 0 ? "text-green-600" : "text-red-600";
    } else {
      return percentage >= 0 ? "text-red-600" : "text-green-600";
    }
  };

  const getPercentageText = () => {
    const percentage = ((item.simulatedAmount - item.originalAmount) / item.originalAmount * 100).toFixed(1);
    const prefix = Number(percentage) > 0 ? "+" : "";
    return `${prefix}${percentage}%`;
  };

  return (
    <div className={`p-3 rounded-lg ${getCategoryColor(item.category)}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${getDotColor(item.category)}`}></span>
          <div className="flex items-center">
            {isCustomItem && onUpdateCustomItem ? (
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdateCustomItem(item.id, "name", e.target.value)}
                className="text-sm font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 focus:ring-0 px-1 py-0.5"
              />
            ) : (
              <span className="text-sm font-medium">{item.name}</span>
            )}
            <span className="ml-2 text-xs text-gray-500">({item.category})</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">Original: {currency} {item.originalAmount.toLocaleString()}</span>
        <div className="flex items-center">
          <span className="text-xs font-medium mr-2">
            Simulated: {currency} {item.simulatedAmount.toLocaleString()}
          </span>
          <span className={`text-xs font-bold ${getPercentageColor()}`}>
            ({getPercentageText()})
          </span>
        </div>
      </div>
      
      {isCustomItem && onUpdateCustomItem && (
        <div className="mb-3">
          <label className="text-xs text-gray-500 mb-1 block">Original Amount</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500">
              {currency}
            </span>
            <Input
              type="number"
              min="0"
              value={item.originalAmount}
              onChange={(e) => onUpdateCustomItem(item.id, "originalAmount", e.target.value)}
              className="pl-7 block w-full rounded-md text-sm"
            />
          </div>
        </div>
      )}
      
      <div>
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <Slider
              value={[item.percentage]}
              min={0}
              max={500}
              step={1}
              onValueChange={(value) => onSliderChange(item.id, value)}
              className="slider-purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationItem;

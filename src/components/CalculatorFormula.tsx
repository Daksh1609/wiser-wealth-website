
import { Calculator } from "lucide-react";

const CalculatorFormula = () => {
  return (
    <div className="mb-4 flex flex-col items-center px-4">
      <button className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-purple-100 text-purple-800 rounded-lg shadow hover:scale-105 transition-transform duration-200 font-semibold border border-purple-200 text-sm sm:text-base">
        <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Logic behind the calculation</span>
      </button>
      
      <div className="mt-3 text-center text-sm text-gray-600 max-w-md mx-auto px-2">
        Savings = Income − (Fixed Expenses + Variable Expenses + Investments)
      </div>
    </div>
  );
};

export default CalculatorFormula;

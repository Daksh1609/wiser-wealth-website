
import React, { useState } from "react";
import { calculateTotalSavings } from "../utils/calculatorUtils";
import { useIsMobile } from "../hooks/use-mobile";
import Header from "../components/Header";
import IntroSection from "../components/IntroSection";
import CalculatorFormula from "../components/CalculatorFormula";
import FinanceChart from "../components/FinanceChart";
import PDFExport from "../components/PDFExport";
import BudgetScenarioSimulator from "../components/WhatIfSimulator";
import PageLayout from "../components/layout/PageLayout";
import ExpenseManager from "../components/expenses/ExpenseManager";
import { ExpenseItem } from "@/types/expenses";

const Index = () => {
  const isMobile = useIsMobile();
  const [currency, setCurrency] = useState("$");
  const [income, setIncome] = useState<number>(5000);
  const [isIncomeFieldFocused, setIsIncomeFieldFocused] = useState(false);
  const [tempIncomeValue, setTempIncomeValue] = useState<string>("5000");
  const [fixedExpenses, setFixedExpenses] = useState<ExpenseItem[]>([
    { id: "rent", name: "Rent/Mortgage", amount: 1200 },
    { id: "utilities", name: "Utilities", amount: 300 },
    { id: "insurance", name: "Insurance", amount: 150 },
  ]);
  const [variableExpenses, setVariableExpenses] = useState<ExpenseItem[]>([
    { id: "groceries", name: "Groceries", amount: 500 },
    { id: "dining", name: "Dining Out", amount: 300 },
    { id: "entertainment", name: "Entertainment", amount: 200 },
  ]);
  const [investments, setInvestments] = useState<ExpenseItem[]>([
    { id: "retirement", name: "Retirement", amount: 500 },
    { id: "savings", name: "Savings", amount: 300 },
  ]);

  const totalFixed = fixedExpenses.reduce((acc, item) => acc + item.amount, 0);
  const totalVariable = variableExpenses.reduce((acc, item) => acc + item.amount, 0);
  const totalInvestments = investments.reduce((acc, item) => acc + item.amount, 0);
  const savings = calculateTotalSavings(income, totalFixed, totalVariable, totalInvestments);

  return (
    <PageLayout>
      {isMobile && (
        <div className="bg-red-100 text-red-800 text-center p-2 text-sm font-medium">
          📱 This website is best experienced on a computer/laptop for better clarity and usability.
        </div>
      )}
      <Header />
      <IntroSection />
      <CalculatorFormula />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <ExpenseManager
          currency={currency}
          setCurrency={setCurrency}
          income={income}
          setIncome={setIncome}
          isIncomeFieldFocused={isIncomeFieldFocused}
          setIsIncomeFieldFocused={setIsIncomeFieldFocused}
          tempIncomeValue={tempIncomeValue}
          setTempIncomeValue={setTempIncomeValue}
          fixedExpenses={fixedExpenses}
          setFixedExpenses={setFixedExpenses}
          variableExpenses={variableExpenses}
          setVariableExpenses={setVariableExpenses}
          investments={investments}
          setInvestments={setInvestments}
        />
        
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 animate-fade-in">
          <FinanceChart
            fixedExpenses={totalFixed}
            variableExpenses={totalVariable}
            investments={totalInvestments}
            income={income}
            currency={currency}
          />
          
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:scale-105 transition-all duration-300 animate-fade-in">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Financial Summary</h2>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Income</p>
                <p className="text-base sm:text-lg font-medium">{currency} {income.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Fixed Expenses</p>
                <p className="text-base sm:text-lg font-medium">{currency} {totalFixed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Variable Expenses</p>
                <p className="text-base sm:text-lg font-medium">{currency} {totalVariable.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Investments</p>
                <p className="text-base sm:text-lg font-medium">{currency} {totalInvestments.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-base sm:text-lg font-semibold">Total Saved</p>
                <p className={`text-lg sm:text-xl font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currency} {savings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-blue-600 font-medium animate-fade-in cursor-pointer hover:text-blue-700">
              👇 Scroll down to use our Budget Scenario Planner to plan your finances smartly
            </p>
          </div>
          
          <PDFExport />
        </div>
      </div>

      <BudgetScenarioSimulator
        currency={currency}
        income={income}
        fixedExpenses={fixedExpenses}
        variableExpenses={variableExpenses}
        investments={investments}
      />
    </PageLayout>
  );
};

export default Index;


import React from 'react';
import CurrencySelector from '../CurrencySelector';
import ExpenseSection from '../ExpenseSection';
import { ExpenseItem } from '@/types/expenses';

interface ExpenseManagerProps {
  currency: string;
  setCurrency: (currency: string) => void;
  income: number;
  setIncome: (income: number) => void;
  isIncomeFieldFocused: boolean;
  setIsIncomeFieldFocused: (focused: boolean) => void;
  tempIncomeValue: string;
  setTempIncomeValue: (value: string) => void;
  fixedExpenses: ExpenseItem[];
  setFixedExpenses: (expenses: ExpenseItem[]) => void;
  variableExpenses: ExpenseItem[];
  setVariableExpenses: (expenses: ExpenseItem[]) => void;
  investments: ExpenseItem[];
  setInvestments: (investments: ExpenseItem[]) => void;
}

const ExpenseManager = ({
  currency,
  setCurrency,
  income,
  setIncome,
  isIncomeFieldFocused,
  setIsIncomeFieldFocused,
  tempIncomeValue,
  setTempIncomeValue,
  fixedExpenses,
  setFixedExpenses,
  variableExpenses,
  setVariableExpenses,
  investments,
  setInvestments,
}: ExpenseManagerProps) => {
  const handleAddItem = (section: ExpenseItem[], setSection: (items: ExpenseItem[]) => void) => {
    const id = `item-${Date.now()}`;
    setSection([...section, { id, name: "New Item", amount: 0 }]);
  };

  const handleRemoveItem = (id: string, section: ExpenseItem[], setSection: (items: ExpenseItem[]) => void) => {
    setSection(section.filter(item => item.id !== id));
  };

  const handleUpdateItem = (
    id: string,
    field: string,
    value: string | number,
    section: ExpenseItem[],
    setSection: (items: ExpenseItem[]) => void
  ) => {
    setSection(
      section.map(item =>
        item.id === id ? { ...item, [field]: field === 'amount' ? Number(value) : value } : item
      )
    );
  };

  const handleIncomeFocus = () => {
    setIsIncomeFieldFocused(true);
    setTempIncomeValue(income.toString());
  };

  const handleIncomeBlur = () => {
    setIsIncomeFieldFocused(false);
    if (tempIncomeValue === '') {
      setIncome(0);
      setTempIncomeValue('0');
    } else {
      const numValue = parseFloat(tempIncomeValue);
      setIncome(isNaN(numValue) ? 0 : numValue);
    }
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempIncomeValue(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <CurrencySelector currency={currency} setCurrency={setCurrency} />
        <div className="form-group w-full sm:w-auto">
          <div className="flex flex-col space-y-1">
            <label htmlFor="income" className="block text-sm font-medium text-gray-700">
              Income
            </label>
            <span className="text-xs text-gray-500">Enter your income</span>
          </div>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              {currency}
            </span>
            <input
              type="number"
              id="income"
              className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              value={isIncomeFieldFocused ? tempIncomeValue : (income === 0 && !isIncomeFieldFocused) ? '' : income}
              onChange={handleIncomeChange}
              onFocus={handleIncomeFocus}
              onBlur={handleIncomeBlur}
            />
          </div>
        </div>
      </div>

      <ExpenseSection
        title="Fixed Expenses"
        items={fixedExpenses}
        currency={currency}
        onAdd={() => handleAddItem(fixedExpenses, setFixedExpenses)}
        onRemove={(id) => handleRemoveItem(id, fixedExpenses, setFixedExpenses)}
        onUpdate={(id, field, value) => handleUpdateItem(id, field, value, fixedExpenses, setFixedExpenses)}
      />

      <ExpenseSection
        title="Variable Expenses"
        items={variableExpenses}
        currency={currency}
        onAdd={() => handleAddItem(variableExpenses, setVariableExpenses)}
        onRemove={(id) => handleRemoveItem(id, variableExpenses, setVariableExpenses)}
        onUpdate={(id, field, value) => handleUpdateItem(id, field, value, variableExpenses, setVariableExpenses)}
      />

      <ExpenseSection
        title="Investments"
        items={investments}
        currency={currency}
        onAdd={() => handleAddItem(investments, setInvestments)}
        onRemove={(id) => handleRemoveItem(id, investments, setInvestments)}
        onUpdate={(id, field, value) => handleUpdateItem(id, field, value, investments, setInvestments)}
      />
    </div>
  );
};

export default ExpenseManager;

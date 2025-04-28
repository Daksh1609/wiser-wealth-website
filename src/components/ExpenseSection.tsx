import { useState } from "react";
import { Tooltip } from "./Tooltip";
import { Info, Trash2 } from "lucide-react";

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
}

interface ExpenseSectionProps {
  title: string;
  items: ExpenseItem[];
  currency: string;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string | number) => void;
}

const ExpenseSection = ({
  title,
  items,
  currency,
  onAdd,
  onRemove,
  onUpdate,
}: ExpenseSectionProps) => {
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  const [tempValues, setTempValues] = useState<Record<string, string>>({});

  const handleFocus = (id: string, amount: number) => {
    setFocusedFields((prev) => ({ ...prev, [id]: true }));
    setTempValues((prev) => ({ ...prev, [id]: amount.toString() }));
  };

  const handleBlur = (id: string) => {
    setFocusedFields((prev) => ({ ...prev, [id]: false }));
    const value = tempValues[id];
    if (value === '') {
      onUpdate(id, "amount", 0);
      setTempValues((prev) => ({ ...prev, [id]: '0' }));
    } else {
      const numValue = parseFloat(value);
      onUpdate(id, "amount", isNaN(numValue) ? 0 : numValue);
    }
  };

  const handleChange = (id: string, value: string) => {
    setTempValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      <fieldset className="border border-gray-200 rounded-md p-3 sm:p-4">
        <legend className="sr-only">{title}</legend>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-3 mb-4 last:mb-0 relative"
          >
            <div className="flex-1">
              <label
                htmlFor={`name-${item.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id={`name-${item.id}`}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base bg-gray-50"
                value={item.name}
                onChange={(e) => onUpdate(item.id, "name", e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor={`amount-${item.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm sm:text-base">
                  {currency}
                </span>
                <input
                  type="number"
                  id={`amount-${item.id}`}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  value={
                    focusedFields[item.id]
                      ? tempValues[item.id]
                      : item.amount === 0 && !focusedFields[item.id]
                        ? ''
                        : item.amount
                  }
                  min="0"
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  onFocus={() => handleFocus(item.id, item.amount)}
                  onBlur={() => handleBlur(item.id)}
                />
              </div>
            </div>

            <button
              type="button"
              className="absolute -right-1 -top-1 sm:static flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors active:bg-red-200"
              onClick={() => onRemove(item.id)}
              aria-label="Remove item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-4 pt-4 border-t border-gray-200">
          <div className="flex w-full sm:w-auto">
            <button
              type="button"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onClick={onAdd}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Item</span>
            </button>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-sm text-gray-500">Total:</span>
            <span className="ml-2 text-base sm:text-lg font-medium">
              {currency} {total.toLocaleString()}
            </span>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default ExpenseSection;

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const currencies = [
  { code: "$", name: "USD - US Dollar" },
  { code: "€", name: "EUR - Euro" },
  { code: "£", name: "GBP - British Pound" },
  { code: "¥", name: "JPY - Japanese Yen", key: "JPY" },
  { code: "₹", name: "INR - Indian Rupee" },
  { code: "₩", name: "KRW - South Korean Won" },
  { code: "C$", name: "CAD - Canadian Dollar" },
  { code: "A$", name: "AUD - Australian Dollar" },
  { code: "₣", name: "CHF - Swiss Franc" },
  { code: "CN¥", name: "CNY - Chinese Yuan" },
];

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

const CurrencySelector = ({ currency, setCurrency }: CurrencySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencyCode);
    setIsOpen(false);
  };

  const currentCurrencyName = currencies.find(c => c.code === currency)?.name.split(' - ')[1] || "US Dollar";

  return (
    <div className="relative">
      <div className="flex flex-col space-y-1">
        <label htmlFor="currency-button" className="block text-sm font-medium text-gray-700">
          Currency
        </label>
        <span className="text-xs text-gray-500">Select your currency</span>
      </div>
      
      <div className="mt-1 relative">
        <button
          type="button"
          id="currency-button"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">
            {currency} - {currentCurrencyName}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
          >
            {currencies.map((currencyOption) => (
              <li
                key={currencyOption.code + (currencyOption.key || currencyOption.name)}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                  currency === currencyOption.code ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleCurrencyChange(currencyOption.code)}
                role="option"
                aria-selected={currency === currencyOption.code}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-base min-w-[24px] flex justify-center">{currencyOption.code}</span>
                  <span className="text-gray-700">- {currencyOption.name.split(' - ')[1]}</span>
                </div>
                
                {currency === currencyOption.code && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CurrencySelector;

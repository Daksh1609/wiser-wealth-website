
/**
 * Calculate the total savings based on income and expenses
 */
export const calculateTotalSavings = (
  income: number,
  fixedExpenses: number,
  variableExpenses: number,
  investments: number
): number => {
  return income - (fixedExpenses + variableExpenses + investments);
};

/**
 * Format a number as currency with the given currency symbol
 */
export const formatCurrency = (amount: number, currencySymbol: string): string => {
  return `${currencySymbol} ${amount.toLocaleString()}`;
};

/**
 * Calculate percentage of total
 */
export const calculatePercentage = (amount: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((amount / total) * 100);
};

// Add window.jspdf typing
declare global {
  interface Window {
    jspdf: {
      jsPDF: any;
    };
    Chart: typeof import('chart.js').Chart;
  }
}

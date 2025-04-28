
export interface SimulationItem {
  id: string;
  name: string;
  originalAmount: number;
  simulatedAmount: number;
  percentage: number;
  category: "income" | "fixed" | "variable" | "investments";
}

export interface WhatIfSimulatorProps {
  currency: string;
  income: number;
  fixedExpenses: { id: string; name: string; amount: number }[];
  variableExpenses: { id: string; name: string; amount: number }[];
  investments: { id: string; name: string; amount: number }[];
}

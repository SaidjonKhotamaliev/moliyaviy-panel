import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import FinancialSummary from "../components/FinancialSummary";
import PieChart from "../components/PieChart";
import { categories, incomeTypes } from "../utils/enums";

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <CurrencyConverter />
      <FinancialSummary />
      <PieChart categories={categories} incomeTypes={incomeTypes} />
    </div>
  );
};

export default Dashboard;

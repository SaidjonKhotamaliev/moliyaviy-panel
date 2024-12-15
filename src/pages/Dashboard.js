import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import FinancialSummary from "../components/FinancialSummary";
// import PieChart from "../components/PieChart";

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <CurrencyConverter />
      {/* <FinancialSummary /> */}
      {/* <PieChart /> */}
    </div>
  );
};

export default Dashboard;

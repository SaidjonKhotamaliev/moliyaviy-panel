import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import FinancialSummary from "../components/FinancialSummary";
import MostUsedCurrencies from "../components/MostUsedCurrencies";
import PieChart from "../components/PieChart";
import { categories, incomeTypes } from "../utils/enums";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/transactions">
                Transactions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <CurrencyConverter />
          </div>
          <div className="col-md-6 mb-4">
            <MostUsedCurrencies />
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <FinancialSummary />
          </div>
          <div className="col-md-6 mb-4">
            <PieChart categories={categories} incomeTypes={incomeTypes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

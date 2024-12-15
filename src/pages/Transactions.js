import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        <a className="navbar-brand" href="/transactions">
          Transaction Dashboard
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

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-12 mb-4">
            <h2 className="text-center mb-4">Manage Your Transactions</h2>
            <TransactionForm setTransactions={setTransactions} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

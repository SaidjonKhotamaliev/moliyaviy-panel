import React, { useEffect, useState } from "react";
import axios from "axios";

const FinancialSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        if (response.data && response.data.rates) {
          setExchangeRates(response.data.rates);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        setError("Failed to fetch exchange rates.");
        setLoading(false);
      });
  }, []);

  const convertToUSD = (amount, currency) => {
    if (currency === "USD") {
      return amount;
    }
    if (exchangeRates[currency]) {
      return amount / exchangeRates[currency];
    }
    return amount;
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + convertToUSD(Number(t.amount), t.currency), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + convertToUSD(Number(t.amount), t.currency), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow">
        <div className="card-header text-center">
          <h3 className="mb-0">Financial Summary</h3>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-center text-muted">Loading exchange rates...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <strong>Total Income:</strong>
                <span className="text-success">
                  ${totalIncome.toFixed(2)} USD
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <strong>Total Expenses:</strong>
                <span className="text-danger">
                  ${totalExpenses.toFixed(2)} USD
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <strong>Balance:</strong>
                <span
                  className={`fw-bold ${
                    balance >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  ${balance.toFixed(2)} USD
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;

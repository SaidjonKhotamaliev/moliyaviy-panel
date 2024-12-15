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
    <div>
      <h3>Financial Summary</h3>
      {loading ? (
        <p>Loading exchange rates...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Total Income: ${totalIncome.toFixed(2)} USD</p>
          <p>Total Expenses: ${totalExpenses.toFixed(2)} USD</p>
          <p>Balance: ${balance.toFixed(2)} USD</p>
        </>
      )}
    </div>
  );
};

export default FinancialSummary;

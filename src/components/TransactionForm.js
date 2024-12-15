import React, { useState, useEffect } from "react";
import axios from "axios";
import { categories, incomeTypes } from "../utils/enums";

const TransactionForm = ({ setTransactions }) => {
  const [form, setForm] = useState({
    type: "",
    amount: 0,
    currency: "",
    category: "",
    date: "",
    note: "",
    time: "",
  });
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        if (response.data && response.data.rates) {
          const fetchedCurrencies = Object.keys(response.data.rates);
          setCurrencies(fetchedCurrencies);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching currencies:", error);
        setError("Failed to fetch currencies");
        setLoading(false);
      });

    const storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, [setTransactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions, form];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });

    setForm({
      type: "",
      amount: 0,
      currency: "",
      category: "",
      date: "",
      note: "",
      time: "",
    });
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h3>Add new Transaction</h3>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type:
        </label>
        <select
          required
          name="type"
          value={form.type}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="currency" className="form-label">
          Currency:
        </label>
        {loading ? (
          <p className="text-muted">Loading currencies...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <select
            required
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Currency</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount:
        </label>
        <input
          required
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select
          required
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">
            Select {form.type === "income" ? "Income Type" : "Expense Category"}
          </option>
          {form.type === "income"
            ? Object.entries(incomeTypes).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))
            : Object.entries(categories).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date:
        </label>
        <input
          required
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="time" className="form-label">
          Time:
        </label>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="note" className="form-label">
          Note:
        </label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="form-control"
          rows="3"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;

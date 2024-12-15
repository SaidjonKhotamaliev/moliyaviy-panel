import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TransactionList = ({ transactions }) => {
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const isTypeMatch = filterType ? tx.type === filterType : true;
    const isCategoryMatch = filterCategory
      ? tx.category === filterCategory
      : true;
    const isDateMatch = filterDate ? tx.date === filterDate : true;

    return isTypeMatch && isCategoryMatch && isDateMatch;
  });

  const categories = [...new Set(transactions.map((tx) => tx.category))];
  const dates = [...new Set(transactions.map((tx) => tx.date))];

  return (
    <div className="container mt-4 mb-5">
      <h3 className="text-center mb-4">Transactions History</h3>

      <div className="mb-4">
        <div className="d-flex justify-content-between">
          <div className="form-group">
            <label htmlFor="type">Filter by Type</label>
            <select
              id="type"
              className="form-select"
              value={filterType}
              onChange={handleTypeChange}
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Filter by Category</label>
            <select
              id="category"
              className="form-select"
              value={filterCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Filter by Date</label>
            <select
              id="date"
              className="form-select"
              value={filterDate}
              onChange={handleDateChange}
            >
              <option value="">All</option>
              {dates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-muted text-center">No transactions to display</p>
      ) : (
        <ul className="list-group">
          {filteredTransactions.map((tx, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-start bg-light`}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {tx.type === "income" ? (
                    <FaArrowUp className="text-success me-2" />
                  ) : (
                    <FaArrowDown className="text-danger me-2" />
                  )}
                  {tx.type}
                </div>
                <small className="text-muted">{tx.category}</small>
              </div>
              <span
                className={`badge rounded-pill ${
                  tx.type === "expense" ? "bg-danger" : "bg-primary"
                }`}
              >
                {tx.amount} {tx.currency}
              </span>
              <small className="text-end text-muted ms-3">{tx.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

import React, { useState } from "react";
import { categories, incomeTypes } from "../utils/enums";

// Enum-like object for categories

const TransactionForm = ({ setTransactions }) => {
  const [form, setForm] = useState({
    type: "income",
    amount: 0,
    category: "",
    date: "",
    note: "",
    incomeType: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle submit of form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic, for example, update transactions
    setTransactions((prevTransactions) => [...prevTransactions, form]);
    // Reset the form after submitting
    setForm({
      type: "income",
      amount: 0,
      category: "",
      date: "",
      note: "",
      time: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Type:</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          required
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        {form.type === "income" ? (
          <select
            required
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {Object.entries(incomeTypes).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        ) : (
          <>
            {" "}
            <select
              required
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          required
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="note">Note:</label>
        <textarea name="note" value={form.note} onChange={handleChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;

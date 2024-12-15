import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="container">
      <h1>Transactions</h1>
      <TransactionForm setTransactions={setTransactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;

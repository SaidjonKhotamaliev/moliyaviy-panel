import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <ul>
      {transactions.map((tx, index) => (
        <li key={index}>
          {tx.type} - {tx.amount} - {tx.category} - {tx.date}
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;

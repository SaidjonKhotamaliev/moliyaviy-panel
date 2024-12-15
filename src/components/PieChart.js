import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Stack } from "@mui/material";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChart = ({ categories, incomeTypes }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categorySumsExpense = expenseTransactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (categories[category]) {
      acc[category] = acc[category]
        ? acc[category] + transaction.amount
        : transaction.amount;
    }
    return acc;
  }, {});

  const incomeTransactions = transactions.filter((t) => t.type === "income");

  const categorySumsIncome = incomeTransactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (incomeTypes[category]) {
      acc[category] = acc[category]
        ? acc[category] + transaction.amount
        : transaction.amount;
    }
    return acc;
  }, {});

  const labelsExpense = Object.keys(categorySumsExpense);
  const dataExpense = Object.values(categorySumsExpense);
  const totalExpenses = dataExpense.reduce(
    (sum, amount) => sum + Number(amount),
    0
  );

  const labelsIncome = Object.keys(categorySumsIncome);
  const dataIncome = Object.values(categorySumsIncome);
  const totalIncome = dataIncome.reduce(
    (sum, amount) => sum + Number(amount),
    0
  );
  console.log("Income Labels:", labelsIncome);
  console.log("Income Data:", dataIncome);

  const chartDataExpense = {
    labels: labelsExpense,
    datasets: [
      {
        label: "Expenses by Category",
        data: dataExpense,
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A6",
          "#FF8C33",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartDataIncome = {
    labels: labelsIncome,
    datasets: [
      {
        label: "Incomes by Category",
        data: dataIncome,
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A6",
          "#FF8C33",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptionsIcome = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (totalIncome === 0) return "No Incomes so far!";

            const percentage = ((context.raw * 100) / totalIncome).toFixed(2);
            const sum = context.raw;
            return `${context.label}: $${sum} (${percentage}%)`;
          },
        },
      },
    },
  };

  const chartOptionsExpense = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (totalExpenses === 0) return "No Expenses so far!";

            const percentage = ((context.raw * 100) / totalExpenses).toFixed(2);
            const sum = context.raw;
            return `${context.label}: $${sum} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (totalIncome === 0 && totalExpenses === 0) {
    return <div>No transactions available.</div>;
  }

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-around"}
      width={"100%"}
      height={"100vh"}
    >
      <Stack alignItems={"center"}>
        <h3>Income Summary</h3>
        <Pie data={chartDataIncome} options={chartOptionsIcome} />
      </Stack>
      <Stack alignItems={"center"}>
        <h3>Expense Summary</h3>
        <Pie data={chartDataExpense} options={chartOptionsExpense} />
      </Stack>
    </Stack>
  );
};

export default PieChart;

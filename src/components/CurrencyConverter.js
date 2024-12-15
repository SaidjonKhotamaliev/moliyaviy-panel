import React, { useState, useEffect } from "react";
import { getExchangeRates } from "../services/ConverterService";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  useEffect(() => {
    getExchangeRates().then((data) => setRates(data.conversion_rates));
  }, []);

  const convert = () => {
    if (fromCurrency === toCurrency) {
      setConverted(amount);
      return;
    }
    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;
    const convertedAmount = (amount / fromRate) * toRate;
    setConverted(convertedAmount.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center">
          <h3 className="mb-0">Currency Converter</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">From:</label>
            <select
              className="form-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(rates).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">To:</label>
            <select
              className="form-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(rates).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100" onClick={convert}>
            Convert
          </button>
          <p className="mt-3 text-center">
            <strong>Converted Amount:</strong> {converted} {toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

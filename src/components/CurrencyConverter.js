import React, { useState, useEffect } from "react";
import { getExchangeRates } from "../services/ConverterService";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [converted, setConverted] = useState(0);
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    getExchangeRates().then((data) => setRates(data.conversion_rates));
  }, []);

  const convert = () => {
    setConverted(amount * (rates[currency] || 1));
  };

  return (
    <div>
      <h3>Currency Converter</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in USD"
      />
      <select onChange={(e) => setCurrency(e.target.value)}>
        {Object.keys(rates).map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
      <button onClick={convert}>Convert</button>
      <p>
        Converted Amount: {converted} {currency}
      </p>
    </div>
  );
};

export default CurrencyConverter;

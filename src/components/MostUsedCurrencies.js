import React, { useState, useEffect } from "react";
import { getExchangeRates } from "../services/ConverterService";

const MostUsedCurrencies = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  const mostUsedCurrencies = ["UZS", "KRW", "IRR"];

  useEffect(() => {
    getExchangeRates()
      .then((data) => {
        setRates(data.conversion_rates);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching rates:", error));
  }, []);

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Exchange Rates</h3>
      {loading ? (
        <p className="text-center">
          <div class="text-center spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </p>
      ) : (
        <div className="row g-4">
          {mostUsedCurrencies.map((currency) => (
            <div className="col-md-4" key={currency}>
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{currency}</h5>
                  <p className="card-text">
                    1 USD = {rates[currency]?.toFixed(2)} {currency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostUsedCurrencies;

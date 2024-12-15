import axios from "axios";
const API_URL =
  "https://v6.exchangerate-api.com/v6/f0190ec1e1dd71158134db4a/latest/USD";

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

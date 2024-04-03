import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.binance.com/api/v3",
});

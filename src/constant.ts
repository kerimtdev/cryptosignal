import ora from "ora";
import { IntervalChoice } from "./type";

export const spinners = {
  getTickers: ora("Fetching tickers..."),
  getKlines: ora("Fetching klines..."),
};

export const intervalChoices = Object.entries(IntervalChoice).map(
  ([title, value]) => ({
    title,
    value,
  })
);

export const initialOHLCV: Record<string, any[]> = {
  timestamp: [],
  open: [],
  high: [],
  low: [],
  close: [],
  volume: [],
};

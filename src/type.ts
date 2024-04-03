export type OHLCVPayload = {};

export type TickerPayload = {
  symbol: string;
  price: string;
};

export type KlinePayload = [
  /** Timestamp, Open, High, Low, Close, Volume  */
  string,
  string,
  string,
  string,
  string,
  string
];

export type GetTickersResponse = TickerPayload[];

export type GetKlinesResponse = KlinePayload[];

export type GetTickersArgs = {};

export type GetKlinesArgs = {
  symbol: string;
  interval: IntervalChoice;
};

export enum IntervalChoice {
  MINUTE_1 = "1m",
  MINUTE_3 = "3m",
  MINUTE_5 = "5m",
  MINUTE_15 = "15m",
  MINUTE_30 = "30m",
  HOUR_1 = "1h",
  HOUR_2 = "2h",
  HOUR_4 = "4h",
  HOUR_6 = "6h",
  HOUR_8 = "8h",
  HOUR_12 = "12h",
  DAY_1 = "1d",
  DAY_3 = "3d",
  WEEK_1 = "1w",
  MONTH_1 = "1M",
}

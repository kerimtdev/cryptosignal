import BigNumber from "bignumber.js";
import PrecisionTradingIndicators from "precision-trading-indicators";
import { KlinePayload } from "./type";
import { initialOHLCV } from "./constant";

export const buildIndicatorOutput = (data: KlinePayload[], period = 14) => {
  const indicator = new PrecisionTradingIndicators(BigNumber);

  const ohlcv = data.reduce(
    (
      acc: typeof initialOHLCV,
      [timestamp, open, high, low, close, volume]
    ) => ({
      timestamp: [...acc.timestamp, timestamp],
      open: [...acc.open, BigNumber(open)],
      high: [...acc.high, BigNumber(high)],
      low: [...acc.low, BigNumber(low)],
      close: [...acc.close, BigNumber(close)],
      volume: [...acc.volume, volume],
    }),
    initialOHLCV
  );

  const bollinger = indicator.BOLLINGER_BANDS(ohlcv.close, 20, 2);
  const candlestick = indicator.getCandlestickPattern(ohlcv);
  const trend = indicator.getTrend(bollinger.mid, period);

  return {
    trend,
    candlestick,
  };
};

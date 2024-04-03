#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import prompts from "prompts";
import { to } from "await-to-js";
import { getKlines, getTickers } from "./service";
import { intervalChoices, spinners } from "./constant";
import { buildIndicatorOutput } from "./util";

console.clear();

console.log(
  chalk.greenBright.bold(
    figlet.textSync("cryptosignal", {
      font: "Larry 3D",
      showHardBlanks: true,
    })
  ) + "\n"
);

(async () => {
  let err, tickers, klines;

  spinners.getTickers.start();

  [err, tickers] = await to(getTickers({}));

  spinners.getTickers.stop();

  if (err) {
    console.error(chalk.red("An error has occured while fetching triggers."));
    return;
  }

  const prompt = await prompts([
    {
      name: "symbol",
      type: "autocompleteMultiselect",
      message: "Symbol",
      min: 1,
      choices: tickers?.data?.map((ticker) => ({
        title: ticker.symbol,
        value: ticker.symbol,
      })),
    },
    {
      name: "interval",
      type: "select",
      message: "Interval",
      choices: intervalChoices,
    },
  ]);

  if (!prompt.symbol || !prompt.interval) return;

  const outputs: Record<string, any> = {};

  try {
    spinners.getKlines.start();

    for (const symbol of prompt.symbol) {
      [err, klines] = await to(
        getKlines({
          symbol: symbol,
          interval: prompt.interval,
        })
      );
      outputs[symbol] = buildIndicatorOutput(klines?.data!, 14);
    }
  } catch (err) {
    spinners.getKlines.stop();
    return console.error(
      chalk.red("An error has occured while fetching klines.")
    );
  } finally {
    spinners.getKlines.stop();
  }

  console.table(
    Array<[string, any]>(...Object.entries(outputs)).map(
      ([symbol, output]) => ({
        Symbol: symbol,
        Interval: prompt.interval,
        "Pattern Direction": output.candlestick.pattern,
        "Pattern Name": output.candlestick.name,
        "Pattern Score": output.candlestick.score,
        "Active Trend": output.trend,
      })
    )
  );
})();

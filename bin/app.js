import $e7wri$chalk from "chalk";
import $e7wri$figlet from "figlet";
import $e7wri$prompts from "prompts";
import {to as $e7wri$to} from "await-to-js";
import $e7wri$axios from "axios";
import $e7wri$ora from "ora";
import $e7wri$bignumberjs from "bignumber.js";
import $e7wri$precisiontradingindicators from "precision-trading-indicators";






const $2ee3875f01c08fb7$export$5fc33d4e2758bd58 = (0, $e7wri$axios).create({
    baseURL: "https://api.binance.com/api/v3"
});


const $3c700f1948406e0b$export$b1319c00e04db0d9 = async (args)=>{
    return (0, $2ee3875f01c08fb7$export$5fc33d4e2758bd58).request({
        method: "GET",
        url: "/ticker/price",
        params: args
    });
};
const $3c700f1948406e0b$export$9e5c183359f8fd67 = async (args)=>{
    return (0, $2ee3875f01c08fb7$export$5fc33d4e2758bd58).request({
        method: "GET",
        url: "/klines",
        params: args
    });
};



var $5d5c81297ed46af3$export$5128aa4ecd1280a4;
(function(IntervalChoice) {
    IntervalChoice["MINUTE_1"] = "1m";
    IntervalChoice["MINUTE_3"] = "3m";
    IntervalChoice["MINUTE_5"] = "5m";
    IntervalChoice["MINUTE_15"] = "15m";
    IntervalChoice["MINUTE_30"] = "30m";
    IntervalChoice["HOUR_1"] = "1h";
    IntervalChoice["HOUR_2"] = "2h";
    IntervalChoice["HOUR_4"] = "4h";
    IntervalChoice["HOUR_6"] = "6h";
    IntervalChoice["HOUR_8"] = "8h";
    IntervalChoice["HOUR_12"] = "12h";
    IntervalChoice["DAY_1"] = "1d";
    IntervalChoice["DAY_3"] = "3d";
    IntervalChoice["WEEK_1"] = "1w";
    IntervalChoice["MONTH_1"] = "1M";
})($5d5c81297ed46af3$export$5128aa4ecd1280a4 || ($5d5c81297ed46af3$export$5128aa4ecd1280a4 = {}));


const $f0aed1fa18949526$export$aa40d6b8948fbc43 = {
    getTickers: (0, $e7wri$ora)("Fetching tickers..."),
    getKlines: (0, $e7wri$ora)("Fetching klines...")
};
const $f0aed1fa18949526$export$a867bcbce9e92f58 = Object.entries((0, $5d5c81297ed46af3$export$5128aa4ecd1280a4)).map(([title, value])=>({
        title: title,
        value: value
    }));
const $f0aed1fa18949526$export$d102b3be7ceada42 = {
    timestamp: [],
    open: [],
    high: [],
    low: [],
    close: [],
    volume: []
};





const $9e97c0d5330f7bcb$export$847f4ee65531b89 = (data, period = 14)=>{
    const indicator = new (0, $e7wri$precisiontradingindicators)((0, $e7wri$bignumberjs));
    const ohlcv = data.reduce((acc, [timestamp, open, high, low, close, volume])=>({
            timestamp: [
                ...acc.timestamp,
                timestamp
            ],
            open: [
                ...acc.open,
                (0, $e7wri$bignumberjs)(open)
            ],
            high: [
                ...acc.high,
                (0, $e7wri$bignumberjs)(high)
            ],
            low: [
                ...acc.low,
                (0, $e7wri$bignumberjs)(low)
            ],
            close: [
                ...acc.close,
                (0, $e7wri$bignumberjs)(close)
            ],
            volume: [
                ...acc.volume,
                volume
            ]
        }), (0, $f0aed1fa18949526$export$d102b3be7ceada42));
    const bollinger = indicator.BOLLINGER_BANDS(ohlcv.close, 20, 2);
    const candlestick = indicator.getCandlestickPattern(ohlcv);
    const trend = indicator.getTrend(bollinger.mid, period);
    return {
        trend: trend,
        candlestick: candlestick
    };
};


console.clear();
console.log((0, $e7wri$chalk).greenBright.bold((0, $e7wri$figlet).textSync("cryptosignal", {
    font: "Larry 3D",
    showHardBlanks: true
})) + "\n");
(async ()=>{
    let err, tickers, klines;
    (0, $f0aed1fa18949526$export$aa40d6b8948fbc43).getTickers.start();
    [err, tickers] = await (0, $e7wri$to)((0, $3c700f1948406e0b$export$b1319c00e04db0d9)({}));
    (0, $f0aed1fa18949526$export$aa40d6b8948fbc43).getTickers.stop();
    if (err) {
        console.error((0, $e7wri$chalk).red("An error has occured while fetching triggers."));
        return;
    }
    const prompt = await (0, $e7wri$prompts)([
        {
            name: "symbol",
            type: "autocompleteMultiselect",
            message: "Symbol",
            min: 1,
            choices: tickers?.data?.map((ticker)=>({
                    title: ticker.symbol,
                    value: ticker.symbol
                }))
        },
        {
            name: "interval",
            type: "select",
            message: "Interval",
            choices: (0, $f0aed1fa18949526$export$a867bcbce9e92f58)
        }
    ]);
    if (!prompt.symbol || !prompt.interval) return;
    const outputs = {};
    try {
        (0, $f0aed1fa18949526$export$aa40d6b8948fbc43).getKlines.start();
        for (const symbol of prompt.symbol){
            [err, klines] = await (0, $e7wri$to)((0, $3c700f1948406e0b$export$9e5c183359f8fd67)({
                symbol: symbol,
                interval: prompt.interval
            }));
            outputs[symbol] = (0, $9e97c0d5330f7bcb$export$847f4ee65531b89)(klines?.data, 14);
        }
    } catch (err) {
        (0, $f0aed1fa18949526$export$aa40d6b8948fbc43).getKlines.stop();
        return console.error((0, $e7wri$chalk).red("An error has occured while fetching klines."));
    } finally{
        (0, $f0aed1fa18949526$export$aa40d6b8948fbc43).getKlines.stop();
    }
    console.table(Array(...Object.entries(outputs)).map(([symbol, output])=>({
            Symbol: symbol,
            Interval: prompt.interval,
            "Pattern Direction": output.candlestick.pattern,
            "Pattern Name": output.candlestick.name,
            "Pattern Score": output.candlestick.score,
            "Active Trend": output.trend
        })));
})();



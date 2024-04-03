import { axiosClient } from "./client";
import {
  GetKlinesArgs,
  GetKlinesResponse,
  GetTickersArgs,
  GetTickersResponse,
} from "./type.js";

export const getTickers = async (args: GetTickersArgs) => {
  return axiosClient.request<GetTickersResponse>({
    method: "GET",
    url: "/ticker/price",
    params: args,
  });
};

export const getKlines = async (args: GetKlinesArgs) => {
  return axiosClient.request<GetKlinesResponse>({
    method: "GET",
    url: "/klines",
    params: args,
  });
};

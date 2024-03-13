import { OptionExpiration } from "@/types";

export async function getOptionsChain(filters: OptionExpiration) {
  const { stock, expiration } = filters;
  const headers = {
    Authorization: "Bearer acI6GbqOGu4AkuBkpxb5vTAlw9bD",
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/options/chains?symbol=${stock}&expiration=${expiration}`,
    { headers: headers }
  );
  const result = await response.json();

  return result;
}

// export async function getClock() {
//   const headers = {
//     Authorization: "Bearer acI6GbqOGu4AkuBkpxb5vTAlw9bD",
//     Accept: "application/json",
//   };

//   const response = await fetch("https://sandbox.tradier.com/v1/markets/clock", {
//     headers: headers,
//   });

//   const result = await response.json();

//   return result;
// }

export async function getLookupCompany(keyword: string) {
  const headers = {
    Authorization: "Bearer acI6GbqOGu4AkuBkpxb5vTAlw9bD",
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/lookup?q=${keyword}`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
}

export async function getQuotes(stock: string) {
  const headers = {
    Authorization: "Bearer acI6GbqOGu4AkuBkpxb5vTAlw9bD",
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/quotes?symbols=${stock}`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
}

export async function decodeQuotes(stock: string) {
  console.log("Hi" + stock);
  const company = await getQuotes(stock);

  const quote: string = company.quotes.quote.last;
  console.log("quote " + quote);
  return quote;
}

// decodes the lookup company API call into a list of tickers
export async function decodeLookupCompany(query: string) {
  if (!query) {
    console.error("Query is null or undefined");
    return []; // or throw an error, or handle it as needed
  }

  console.log("decode query " + query);
  const lookup = await getLookupCompany(query);

  const symbols: string[] = lookup.securities.security.map(
    (security: { symbol: any }) => security.symbol
  );

  return symbols;
}

const option: OptionExpiration = {
  stock: "GOOGL",
  expiration: "2024-03-22",
};

// decodes the options chain API call into a list of options
export async function decodeOptionsData(filter: OptionExpiration) {
  const { stock, expiration } = filter;

  const optionData = await getOptionsChain(filter);
  return optionData.options.option;
}

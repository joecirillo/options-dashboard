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

// decodes the options chain API call into a list of options
export async function decodeOptionsData(filter: OptionExpiration) {
  const { stock, expiration } = filter;

  const optionData = await getOptionsChain(filter);
  return optionData.options.option;
}

export async function getExpirations(ticker: string) {
  console.log(ticker);
  const headers = {
    Authorization: "Bearer acI6GbqOGu4AkuBkpxb5vTAlw9bD",
    Accept: "application/json",
  };

  try {
    const response = await fetch(
      `https://sandbox.tradier.com/v1/markets/options/expirations?symbol=${ticker}`,
      { headers: headers }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch expirations data");
    }

    const result = await response.json();
    console.log(result);

    if (result.expirations === null) {
      console.warn(`Expiration dates for ticker ${ticker} are null`);
      return []; // Return an empty array if expirations is null
    }

    // Access the date array directly from result
    const expirations: string[] = result.expirations.date.map((date: any) =>
      String(date)
    );
    console.log(expirations);

    return expirations;
  } catch (error) {
    console.error("Error fetching expirations data:", error);
    // Handle the error here, e.g., return an empty array or re-throw the error
    throw error; // Rethrow the error to propagate it up the call stack
  }
}

import { OptionExpiration } from "@/types";

export const testAPI = () => {
  console.log("Value: " + process.env.API_KEY);
};

const testAPI2 = `Bearer ${process.env.API_KEY}`;
console.log(testAPI2);

export async function getQuotes(stock: string) {
  const headers = {
    Authorization: testAPI2,
    Accept: "application/json",
  };
  console.log("Oh " + testAPI2);
  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/quotes?symbols=${stock}`,
    { headers: headers }
  );

  const company = await response.json();

  const quote: string = company.quotes.quote.last;
  console.log("quote " + quote);
  return quote;
}

// decodes the lookup company API call into a list of tickers
export async function lookupCompany(query: string) {
  console.log("Oh 2 " + testAPI2);
  const headers = {
    Authorization: "Bearer acI6GbqOGu4AkuBkpxb5vTAlw9bD",
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/lookup?q=${query}`,
    { headers: headers }
  );

  const lookup = await response.json();

  if (!query) {
    console.error("Query is null or undefined");
    return []; // or throw an error, or handle it as needed
  }

  console.log("decode query " + query);

  const symbols: string[] = lookup.securities.security.map(
    (security: { symbol: any }) => security.symbol
  );

  return symbols;
}

// decodes the options chain API call into a list of options
export async function getOptionsData(filter: OptionExpiration) {
  const { stock, expiration } = filter;
  const headers = {
    Authorization: testAPI2,
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/options/chains?symbol=${stock}&expiration=${expiration}`,
    { headers: headers }
  );
  const optionData = await response.json();

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

export async function lookupCompany(query: string) {
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
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

  if (!lookup.securities) {
    console.error("Securities is null");
    return [];
  }

  let symbols: string[];

  if (Array.isArray(lookup.securities.security)) {
    symbols = lookup.securities.security.map(
      (security: { symbol: any }) => security.symbol
    );
  } else {
    symbols = [lookup.securities.security.symbol];
  }

  return symbols;
}

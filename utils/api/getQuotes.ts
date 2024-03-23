export async function getQuotes(stock: string) {
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/quotes?symbols=${stock}`,
    { headers: headers }
  );

  const company = await response.json();

  const quote: string = company.quotes.quote.last;
  return quote;
}

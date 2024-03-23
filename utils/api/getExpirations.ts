export async function getExpirations(ticker: string) {
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
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

    if (result.expirations === null) {
      console.warn(`Expiration dates for ticker ${ticker} are null`);
      return []; // Return an empty array if expirations is null
    }

    // Access the date array directly from result
    const expirations: string[] = result.expirations.date.map((date: any) =>
      String(date)
    );

    return expirations;
  } catch (error) {
    console.error("Error fetching expirations data:", error);
    // Handle the error here, e.g., return an empty array or re-throw the error
    throw error; // Rethrow the error to propagate it up the call stack
  }
}

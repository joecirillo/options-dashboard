import { OptionExpiration } from "@/types";

// Decodes the options chain API call into a list of options
export async function getOptionsData(filter: OptionExpiration) {
  const { stock, expiration } = filter;
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
    Accept: "application/json",
  };

  try {
    const response = await fetch(
      `https://sandbox.tradier.com/v1/markets/options/chains?symbol=${stock}&expiration=${expiration}`,
      { headers: headers }
    );

    // Check if the response status is OK (200–299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const optionData = await response.json();

    // Check if optionData and options are present
    if (!optionData || !optionData.options || !optionData.options.option) {
      throw new Error("Invalid data format received from API");
    }

    return optionData.options.option;
  } catch (error) {
    console.error("Failed to fetch options data:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

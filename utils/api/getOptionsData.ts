import { OptionExpiration } from "@/types";

// decodes the options chain API call into a list of options

export async function getOptionsData(filter: OptionExpiration) {
  const { stock, expiration } = filter;
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
    Accept: "application/json",
  };

  const response = await fetch(
    `https://sandbox.tradier.com/v1/markets/options/chains?symbol=${stock}&expiration=${expiration}`,
    { headers: headers }
  );
  const optionData = await response.json();

  return optionData.options.option;
}

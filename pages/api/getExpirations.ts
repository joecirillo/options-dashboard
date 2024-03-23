import { NextApiRequest, NextApiResponse } from "next";
import { getExpirations } from "@/utils/api/getExpirations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ticker } = req.query;

  try {
    const expirations = await getExpirations(ticker as string); // Call the function with the ticker parameter
    res.status(200).json({ expirations });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

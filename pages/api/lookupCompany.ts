import { lookupCompany } from "@/utils/api/lookupCompany";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  try {
    const companies = await lookupCompany(query as string); // Call the function with the query parameter
    res.status(200).json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

import { connectDB } from "../config/database.js"

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: string) {
  const db = await connectDB()

  const result = await db.query<Company, [string]>(
    `SELECT * FROM companies 
    JOIN employees ON employees."companyId"=companies.id
    WHERE "apiKey"=$1`,
    [apiKey]
  );

  return result.rows[0];
}
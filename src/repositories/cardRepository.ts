import { connectDB } from "../config/database.js"
import { mapObjectToUpdateQuery } from "../utils/sqlUtils.js";



export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export interface Card {
  id: number;
  employeeId: number;
  number: string;
  cardholderName: string;
  securityCode: string;
  expirationDate: string;
  password?: string;
  isVirtual: boolean;
  originalCardId?: number;
  isBlocked: boolean;
  type: TransactionTypes;
}

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;

export async function find() {
  const db = await connectDB()
  const result = await db.query<Card>("SELECT * FROM cards");
  return result.rows;
}

export async function findById(id: number) {
  const db = await connectDB()

  const result = await db.query<Card, [number]>(
    "SELECT * FROM cards WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function findByTypeAndEmployeeId(
  
  type: TransactionTypes,
  employeeId: number
  ) {
  const db = await connectDB()
  const result = await db.query<Card, [TransactionTypes, number]>(
    `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
    [type, employeeId]
  );

  return result.rows[0];
}

export async function findByCardDetails(
  number: string,
  cardholderName: string,
  expirationDate: string
) {
  const db = await connectDB()

  const result = await db.query<Card, [string, string, string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate]
  );

  return result.rows[0];
}

export async function insert(cardData: CardInsertData) {
  const db = await connectDB()

  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  } = cardData;

  return await db.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `,
    [
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    ]
  );
}

export async function update(id: number, passCrypt: string) {
  const db = await connectDB()

  db.query(
    `
    UPDATE cards
    SET 
    password = $1,
    "isBlocked" = false
    WHERE id=$2
  `,
    [passCrypt, id]
  );
}

export async function block(id: number, aux: boolean) {
  const db = await connectDB()

  db.query(
    `UPDATE cards
    SET 
    "isBlocked"=$1
    WHERE id=$2
  `,[aux, id])
}

export async function remove(id: number) {
  const db = await connectDB()

  db.query<any, [number]>("DELETE FROM cards WHERE id=$1", [id]);
}

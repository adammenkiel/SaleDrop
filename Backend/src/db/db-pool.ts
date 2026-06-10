import { error } from "node:console";
import { Pool } from "pg";

let dataBasePool: Pool;


export async function connectDB() {
  dataBasePool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
  });
  await dataBasePool.query("SELECT 1");
}

export function getPool() : Pool {
  if(!dataBasePool) {
    throw new Error("There is no connection to database!");
  }
  return dataBasePool;
}
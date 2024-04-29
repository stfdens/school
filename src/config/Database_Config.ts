import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PW,
  database: process.env.DB,
});

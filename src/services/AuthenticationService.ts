import { Response } from "express";
import { connection } from "../config/Database_Config";
import responseApi from "../config/Response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Account {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

export default class AuththenticationsService {
  constructor() {}

  static async Register(
    res: Response,
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const sql: string = `INSERT INTO account (username, email, password) VALUES (?,?,?)`;
      bcrypt.hash(password, 15, (err, result): void => {
        connection.query(
          sql,
          [username, email, result],
          (err, result): void => {
            if (err) {
              if (err.sqlState === "2300") {
                return responseApi.ResponseData(
                  res,
                  400,
                  "FAILED",
                  "MASUKAN DATA DENGAN BENAR"
                );
              }
              return responseApi.ResponseData(
                res,
                500,
                "FAILED",
                "SERVER ERROR"
              );
            }
            responseApi.ResponseData(res, 200, "SUCCESS", "REGISTER SUCCESS");
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  }

  static Login(res: Response, username: string, password: string): void {
    try {
      const sql: string = `SELECT * FROM account WHERE username = ?`;
      connection.query(sql, [username], (err, result): void => {
        if (err) {
          return responseApi.ResponseData(res, 500, "FAILED", "SERVER ERROR");
        }

        if (!result) {
          return responseApi.ResponseData(res, 404, "FAILED", "DATA TIDAK ADA");
        }

        const data: Account = result[0];

        bcrypt.compare(
          password,
          data.password as string,
          (err, result): void => {
            if (err) {
              return responseApi.ResponseData(
                res,
                500,
                "FAILED",
                "SERVER ERROR"
              );
            }

            if (result) {
              const token = jwt.sign(
                { Id: data.id, Username: data.username, Role: data.role },
                `${process.env.SECRET_KEY}`,
                { expiresIn: "1h" }
              );
              responseApi.ResponseData(res, 200, "SUCCESS", token);
              return;
            }

            responseApi.ResponseData(
              res,
              400,
              "FAILED",
              "MASUKAN PW YANG BENAR"
            );
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  }
}

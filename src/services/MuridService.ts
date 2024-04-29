import { Request, Response } from "express";
import { connection } from "../config/Database_Config";

export default class MuridService {
  constructor() {}

  static getAllMurid(req: Request, res: Response): void {
    try {
      const sql: string = `SELECT * FROM murid`;
      connection.query(sql, (err, result):void => {
        if (err) {
            return
        }
      })
    } catch (error) {
      if (error) {
        return console.error(error);
      }
    }
  }
}

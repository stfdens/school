import { Response, Request } from "express";
import { connection } from "../config/Database_Config";
import responseApi from "../config/Response";
import { RequestAll } from "../interface/interfaceAllData";

export default class MuridService {
  constructor() {}

  static getAllMurid(req: RequestAll, res: Response): void {
    try {
      console.log(req.token);

      const sql: string = `SELECT * FROM murid`;
      connection.query(sql, (err, result): void => {
        if (err) {
          return responseApi.ResponseData(res, 500, "FAILED", "SERVER ERROR");
        }

        responseApi.ResponseData(res, 200, "SUCCESS", result);
      });
    } catch (error) {
      if (error) {
        return console.error(error);
      }
    }
  }

  static getMuridByName(res: Response, nama: string) {
    try {
      const sql: string = `SELECT * FROM murid WHERE nama = ?`;
      connection.query(sql, [nama], (err, result): void => {
        if (err) {
          return responseApi.ResponseData(res, 500, "FAILED", "SERVER ERROR");
        }

        if (result.length === 0) {
          return responseApi.ResponseData(
            res,
            404,
            "FAILED",
            "DATA TIDAK DITEMUKAN"
          );
        }

        responseApi.ResponseData(res, 200, "SUCCESS", result);
      });
    } catch (error) {
      if (error) {
        return console.error(error);
      }
    }
  }

  static postMurid(
    res: Response,
    nama: string,
    jenis_kelamin: string,
    nis: number,
    kelas: string,
    alamat: string
  ) {
    try {
      const sql: string = `INSERT INTO murid (nama, jenis_kelamin, nis, kelas, alamat) VALUES (?, ?, ?, ?, ?)`;
      connection.query(
        sql,
        [nama, jenis_kelamin, nis, kelas, alamat],
        (err, result): void => {
          if (err) {
            if (err.sqlState === "23000") {
              return responseApi.ResponseData(
                res,
                400,
                "FAILED",
                "MASUKAN DATA DENGAN BENAR"
              );
            }
            return responseApi.ResponseData(res, 500, "FAILED", "SERVER ERROR");
          }

          responseApi.ResponseData(
            res,
            201,
            "SUCCES",
            "DATA BERHASIL DITAMBAHKAN"
          );
        }
      );
    } catch (error) {
      if (error) {
        return console.error(error);
      }
    }
  }

  static updateMuridById(
    res: Response,
    nama: string,
    jenis_kelamin: string,
    nis: number,
    kelas: string,
    alamat: string,
    id: string
  ): void {
    try {
      const sql: string = `UPDATE murid SET nama = ?, jenis_kelamin = ?, nis = ?, kelas = ?, alamat = ? WHERE id = ?`;
      connection.query(
        sql,
        [nama, jenis_kelamin, nis, kelas, alamat, id],
        (err, result): void => {
          if (err) {
            if (err.sqlState === "23000") {
              return responseApi.ResponseData(
                res,
                400,
                "FAILED",
                "MASUKAN DATA DENGAN BENAR"
              );
            }
            return responseApi.ResponseData(res, 500, "FAILED", "SERVER ERROR");
          }

          if (result.length === 0) {
            return responseApi.ResponseData(
              res,
              404,
              "FAILED",
              "DATA TIDAK DITEMUKAN"
            );
          }

          responseApi.ResponseData(
            res,
            200,
            "SUCCESS",
            "DATA BERHASIL DI UPDATE"
          );
        }
      );
    } catch (error) {
      if (error) {
        return console.error(error);
      }
    }
  }

  static deleteMuridById(res: Response, id: string) {
    try {
      const sql: string = `DELETE FROM murid WHERE id = ?`;
      connection.query(sql, [id], (err, result): void => {
        if (err) {
          return responseApi.ResponseData(res, 500, "FAILED", "SERVER ERROR");
        }

        responseApi.ResponseData(res, 200, "SUCCESS", "DATA DIHAPUS");
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }
}

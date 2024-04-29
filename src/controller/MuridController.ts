import { Request, Response } from "express";
import MuridService from "../services/MuridService";
import responseApi from "../config/Response";

interface Data {
  id?: string;
  nama?: string;
  jenis_kelamin?: string;
  nis?: number;
  kelas?: string;
  alamat?: string;
}

export default class muridController {
  constructor() {}

  static getAllMurid(res: Response): void {
    MuridService.getAllMurid(res);
  }

  static getMuridByName(req: Request, res: Response): void {
    const { nama } = req.params;
    if (nama) {
      MuridService.getMuridByName(res, nama);
    }
  }

  static postMurid(req: Request, res: Response): void {
    const { nama, jenis_kelamin, nis, kelas, alamat }: Data = req.body;
    if (nama && jenis_kelamin && nis && kelas && alamat) {
      MuridService.postMurid(res, nama, jenis_kelamin, nis, kelas, alamat);
    } else {
      responseApi.ResponseData(res, 400, "FAILED", "BAD REQUEST");
    }
  }

  static updateMurid(req: Request, res: Response): void {
    const { id }: Data = req.params;
    const { nama, jenis_kelamin, nis, kelas, alamat }: Data = req.body;
    if (nama && jenis_kelamin && nis && kelas && alamat) {
      MuridService.updateMuridById(
        res,
        nama,
        jenis_kelamin,
        nis,
        kelas,
        alamat,
        id
      );
    } else {
      responseApi.ResponseData(res, 400, "FAILED", "BAD REQUEST");
    }
  }

  static deleteMurid(req: Request, res: Response): void {
    const { id }: Data = req.params;
    MuridService.deleteMuridById(res, id);
  }
}

import { Request, Response } from "express";
import MuridService from "../services/MuridService";
import { Murid, RequestAll } from "../interface/interfaceAllData";

export default class muridController {
  constructor() {}

  static getAllMurid(req: RequestAll, res: Response): void {
    MuridService.getAllMurid(req, res);
  }

  static getMuridByName(req: Request, res: Response): void {
    const { nama } = req.params;
    if (nama) {
      MuridService.getMuridByName(res, nama);
    }
  }

  static postMurid(req: Request, res: Response): void {
    const { nama, jenis_kelamin, nis, kelas, alamat }: Murid = req.body;
    if (nama && jenis_kelamin && nis && kelas && alamat) {
      MuridService.postMurid(res, nama, jenis_kelamin, nis, kelas, alamat);
    }
  }

  static updateMurid(req: Request, res: Response): void {
    const { id }: Murid = req.params;
    const { nama, jenis_kelamin, nis, kelas, alamat }: Murid = req.body;
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
    }
  }

  static deleteMurid(req: Request, res: Response): void {
    const { id }: Murid = req.params;
    MuridService.deleteMuridById(res, id);
  }
}

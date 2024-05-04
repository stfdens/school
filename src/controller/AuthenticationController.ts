import { Request, Response } from "express";
import AuththenticationsService from "../services/AuthenticationService";
import { Account } from "../interface/interfaceAllData";

export default class AuththenticationsController {
  constructor() {}

  static register(req: Request, res: Response): void {
    const { username, email, password }: Account = req.body;
    if (username && email && password) {
      AuththenticationsService.Register(res, username, email, password);
    }
  }

  static login(req: Request, res: Response): void {
    const { username, password }: Account = req.body;
    if (username && password) {
      AuththenticationsService.Login(res, username, password);
    }
  }
}

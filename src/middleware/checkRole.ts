import { NextFunction, Request, Response } from "express";
import { RequestAll } from "../interface/interfaceAllData";
import responseApi from "../config/Response";

export const checkRolesAccount = (
  req: RequestAll,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role === "user") {
    return responseApi.ResponseData(res, 401, "FAILED", "NOT HAVE ACCESS");
  }

  next();
};

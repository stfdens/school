import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import responseApi from "../config/Response";

export const validationsRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requesSchema = Joi.object({
    nama: Joi.string().required(),
    jenis_kelamin: Joi.string().required(),
    nis: Joi.number().required(),
    kelas: Joi.string().required(),
    alamat: Joi.string().required(),
  });

  const { error } = requesSchema.validate(req.body);
  if (error) {
    return responseApi.ResponseData(
      res,
      400,
      "FAILED",
      error.details[0].message
    );
  }

  next();
};

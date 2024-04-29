import { Response } from "express";

export default class responseApi {
  constructor() {}

  static ResponseData(
    res: Response,
    statusCode: number,
    message: string,
    data?: string
  ) {
    res.status(statusCode).json({
      data: {
        statusCode,
        data,
        message,
      },
    });
  }
}

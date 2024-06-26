import { Response } from "express";

export default class responseApi {
  constructor() {}

  static ResponseData(
    res: Response,
    statusCode: number,
    message: string,
    data?: string | object
  ) {
    res.status(statusCode).json({
      meta: {
        statusCode,
        message,
      },
      data: data,
    });
  }
}

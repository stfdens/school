import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Account {
  username?: string;
  email?: string;
  password?: string;
}

export interface Murid {
  id?: string;
  nama?: string;
  jenis_kelamin?: string;
  nis?: number;
  kelas?: string;
  alamat?: string;
}

export interface Role {
  admin?: string;
  murid?: string;
  user?: string;
}

export interface UserAccount {
  id?: string;
  username?: string;
  role?: string;
}

// nyimpen data dari jwtpayload
export interface CustomJwtPayload extends JwtPayload {
  Id?: string;
  Username?: string;
  Role?: string;
}

export interface RequestAll extends Request {
  murid?: Murid;
  user?: UserAccount;
}

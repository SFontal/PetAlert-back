import { type JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface CustomJwtPayload extends JwtPayload {
  username: string;
  email: string;
}

export interface PetStructure {
  name: string;
  born?: Date;
  gender: string;
  specie: string;
  breed?: string;
  colour?: string;
  size?: string;
  description: string;
  imageUrl: string;
}

export type PetsStructure = PetStructure[];

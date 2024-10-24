import { ApiResponse } from "./api";


export type TempoAuth = {
  token: string;
  email: string;
  password: string;
  name: string;
  exp: number;
  requestedRole: string;
  roles: string[];
}

export type Auth = {
  token: string;
  id: string;
  email: string;
  roles: string[];
}

export interface SessionApiResponse extends ApiResponse {
  entity: Auth | TempoAuth;
}

export interface SessionDetails {
  email: string;
  password: string;
}

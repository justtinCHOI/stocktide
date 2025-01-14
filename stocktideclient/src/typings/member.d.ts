import { Member } from '@typings/entity';

export interface LoginState {
  email: string;
  password: string;
}

export interface LoginParam {
  email: string;
  password: string;
}

export interface MemberState {
  memberId: number;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface MemberSliceState {
  member: Member | null;
  loading: boolean;
  error: any;
}

export interface LoginResponse {
  memberId: number;
  email: string;
  name: string;
  nickname?: string;
  password: string;
  cashList: Cash[];
  social: boolean;
  roleNames: string[];
  status: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginParam {
  email: string;
  password: string;
}
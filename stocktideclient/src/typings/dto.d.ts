import { OrderTypes, OrderStates, Cash } from './entity';

// Member DTOs
export interface MemberDTO {
  memberId: number;
  email: string;
  name: string;
  nickname?: string;
  password: string;
  cashList: Cash[];
  social: boolean;
  roleNames: string[];
  status: string;
}

export interface MemberModifyDTO {
  memberId: number;
  name: string;
  email: string;
  password: string;
}

// Company DTOs
export interface CompanyResponseDto {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: StockAsBiResponseDto;
  stockInfResponseDto: StockInfResponseDto;
}

export interface CompanyModifyDTO {
  companyId: number;
  code: string;
  korName: string;
}

export interface StockAsBiResponseDto {
  stockAsBiId: number;
  companyId: number;
  askp1: string;
  askp2: string;
  askp3: string;
  askp4: string;
  askp5: string;
  askp6: string;
  askp7: string;
  askp8: string;
  askp9: string;
  askp10: string;
  askp_rsqn1: string;
  askp_rsqn2: string;
  askp_rsqn3: string;
  askp_rsqn4: string;
  askp_rsqn5: string;
  askp_rsqn6: string;
  askp_rsqn7: string;
  askp_rsqn8: string;
  askp_rsqn9: string;
  askp_rsqn10: string;
  bidp1: string;
  bidp2: string;
  bidp3: string;
  bidp4: string;
  bidp5: string;
  bidp6: string;
  bidp7: string;
  bidp8: string;
  bidp9: string;
  bidp10: string;
  bidp_rsqn1: string;
  bidp_rsqn2: string;
  bidp_rsqn3: string;
  bidp_rsqn4: string;
  bidp_rsqn5: string;
  bidp_rsqn6: string;
  bidp_rsqn7: string;
  bidp_rsqn8: string;
  bidp_rsqn9: string;
  bidp_rsqn10: string;
}

// StockInf DTOs
export interface StockInfResponseDto {
  stockInfId: number;
  companyId: number;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
}

// StockHold DTOs
export interface StockHoldResponseDto {
  stockHoldId: number;
  memberId: number;
  companyId: number;
  companyKorName: string;
  stockCount: number;
  totalPrice: number;
  percentage: number;
  stockReturn: number;
  reserveSellStockCount: number;
}

// StockMin DTOs
export interface StockMinResponseDto {
  stockMinId: number;
  companyId: number;
  stockTradeTime: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
}

// StockOrder DTOs
export interface StockOrderResponseDto {
  stockOrderId: number;
  stockCount: number;
  memberId: number;
  companyId: number;
  OrderTypes: OrderTypes;
  OrderStates: OrderStates;
  price: number;
  modifiedAt: string;
}

// Cash DTOs
export interface CashResponseDto {
  cashId: number;
  accountNumber: string;
  money: number;
  dollar: number;
}

// company
export interface CompanyCreateDto {
  code: string;
  korName: string;
  createdAt?: string;
}

export interface CompanyUpdateDto {
  companyId: number,
  code: string;
  korName: string;
  createdAt?: string;
}

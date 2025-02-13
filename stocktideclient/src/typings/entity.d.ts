// 기본 Entity 인터페이스 정의 (공통 속성)
interface BaseEntity {
  createdAt: Date;
  modifiedAt: Date;
}

// Member Entity 인터페이스
export interface Member extends BaseEntity {
  memberId: number;
  email: string;
  name: string;
  nickname?: string;
  password: string;
  cashList: Cash[];
  social: boolean;
  memberRoleList: MemberRole[];
  memberStatus: MemberStatus;
}

export enum MarketType {
  DOMESTIC = 'DOMESTIC',
  OVERSEAS = 'OVERSEAS'
}

// Company Entity 인터페이스
export interface Company extends BaseEntity {
  companyId: number;
  code: string;
  korName: string;
  engName: string;
  stockAsBi: StockAsBi;
  stockInf: StockInf;
}


// StockAsBi Entity 인터페이스
export interface StockAsBi {
  stockAsBiId: number;
  company: Company;
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

// Cash Entity 인터페이스
export interface Cash extends BaseEntity {
  cashId: number;
  accountNumber: string;
  money: number;
  dollar: number;
  member: Member;
}

// StockHold Entity 인터페이스
export interface StockHold extends BaseEntity {
  stockHoldId: number;
  member: Member;
  company: Company;
  stockCount: number;
  reserveStockCount: number;
  price: number;
}

// StockInf Entity 인터페이스
export interface StockInf {
  stockInfId: number;
  company: Company;
  stck_prpr: string;   // 현재가
  prdy_vrss: string;   // 전일대비
  prdy_ctrt: string;   // 전일대비율
  acml_vol: string;    // 누적거래량
  acml_tr_pbmn: string; // 누적거래대금
}

// StockMin Entity 인터페이스
export interface StockMin {
  stockMinId: number;
  company: Company;
  stockTradeTime: Date;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
}

// StockOrder Entity 인터페이스
export interface StockOrder extends BaseEntity {
  stockOrderId: number;
  stockCount: number;
  member: Member;
  company: Company;
  orderTypes: OrderTypes;
  orderStates: OrderStates;
  price: number;
}

export interface StockNews {
  data_dt: string;     // 뉴스 날짜
  data_tm: string;     // 뉴스 시간
  hts_pbnt_titl_cntt: string;   // 뉴스 제목
  dorg: string;  // 언론사
}

// Token Entity 인터페이스
export interface Token {
  tokenId: number;
  token: string;
  expired: Date;
}

// Enum Types
export enum MemberRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN'
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  QUIT = 'QUIT'
}

export enum OrderTypes {
  SELL = 'SELL',
  BUY = 'BUY'
}

export enum OrderStates {
  ORDER_COMPLETE = 'ORDER_COMPLETE',
  ORDER_WAIT = 'ORDER_WAIT'
}
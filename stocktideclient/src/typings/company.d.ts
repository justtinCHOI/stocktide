export interface CompanyAddState {
  code: string;
  korName: string;
  created_at: string;
}

export interface CompanyInfoState {
  companyId: number;
  code: string;
  korName: string;
  createdAt: string;
}

export interface StockBasicResponseDto {
  pdno: string;                     // 종목번호
  prdt_abrv_name: string;          // 상품약어명
  prdt_eng_abrv_name: string;      // 상품영문약어명
  lstg_stqt: string;               // 상장주식수
  cpta: string;                    // 자본금
  papr: string;                    // 액면가
}

export interface StockBalanceDto {
  output: BalanceOutput[];
  rt_cd: string;   // 성공실패여부 코드
  msg_cd: string;  // 응답코드
  msg1: string;    // 응답메시지
}

export interface BalanceOutput {
  stac_yymm: string;      // 회계년월
  cras: string;           // 유동자산
  fxas: string;           // 고정자산
  total_aset: string;     // 총자산
  flow_lblt: string;      // 유동부채
  fix_lblt: string;       // 고정부채
  total_lblt: string;     // 총부채
  cpfn: string;          // 자본금
  cfp_surp: string;      // 자본잉여금
  prfi_surp: string;     // 이익잉여금
  total_cptl: string;    // 총자본
  crnt_rate: string;     // 유동비율
  lblt_rate: string;     // 부채비율
  bram_depn: string;     // 차입금의존도
  quck_rate: string;     // 당좌비율
}

export interface StockNewsDto {
  output: NewsOutput[];
  rt_cd: string;
  msg_cd: string;
  msg1: string;
}

export interface NewsOutput {
  data_dt: string;     // 뉴스 날짜
  hts_pbnt_titl_cntt: string;   // 뉴스 제목
  dorg: string;  // 언론사
}
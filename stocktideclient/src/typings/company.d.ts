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

export interface StockBasicDto {
  output: {
    pdno: string;                     // 종목번호
    prdt_type_cd: string;            // 상품유형코드
    mket_id_cd: string;              // 시장구분코드
    lstg_stqt: string;               // 상장주식수
    lstg_cptl_amt: string;           // 상장자본금
    cpta: string;                    // 자본금
    papr: string;                    // 액면가
    issu_pric: string;               // 발행가
    prdt_name: string;               // 상품명
    prdt_name120: string;            // 상품명120
    prdt_abrv_name: string;          // 상품약어명
    std_pdno: string;                // 표준상품번호
    prdt_eng_name: string;           // 상품영문명
    prdt_eng_name120: string;        // 상품영문명120
    prdt_eng_abrv_name: string;      // 상품영문약어명
  };
  rt_cd: string;       // 성공실패여부 코드
  msg_cd: string;      // 응답코드
  msg1: string;        // 응답메시지
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
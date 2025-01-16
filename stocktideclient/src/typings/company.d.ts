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
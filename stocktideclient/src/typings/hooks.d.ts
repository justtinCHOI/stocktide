import { Member, Company, Cash, StockHold, StockOrder, Token } from './entity';

export interface CompanyDataResponse {
  data?: extractedCompanyData[];
  data2?: extractedCompanyData2[];
  isLoading: boolean;
  isError: boolean | null;
}

export interface extractedCompanyData{
  companyId: number,
  code: string,
  korName: string,
  stockPrice: string,// 현재 주가
  stockChangeAmount: string,//전일 대비 주가
  stockChangeRate: string,
}

export interface extractedCompanyData2 {
  companyId: number,
  code: string,
  korName: string,
  stockPrice: string,// 현재 주가
  priceChangeAmount: string, //전일 대비 주가
  transactionVolume: string, //거래량
  priceChangeRate: string,// 전일 대비율
  amount: string, // 총 거래대금
}

export interface CustomCashHook {
  cashState: {
    cashList: Cash[];
    cashId: number;
  };
  doUpdateCashId: (cashId: number) => void;
  doCreateCash: (memberId: number) => Promise<Cash>;
  doGetCashList: (memberId: number) => Promise<Cash[]>;
  doDeleteCash: (cashId: number) => Promise<number>;
  doUpdateCash: (cashId: number, money: number, dollar: number) => Promise<Cash>;
  moveToManage: () => void;
}

export interface CustomLoginHook {
  loginState: Member;
  isLogin: boolean;
  doLogin: (loginParam: LoginParam) => Promise<any>;
  doLogout: () => void;
  moveToPath: (path: string) => void;
  moveToLogin: () => void;
}

export interface CustomMoveHook {
  moveToList: () => void;
  moveToModify: (num: number) => void;
  moveToChart: (num: number) => void;
  moveToMemberModify: () => void;
  refresh: boolean;
}

export interface GetCashResponse {
  cashData?: number;
  cashLoading: boolean;
  cashError: boolean | null;
}

export interface GetHoldingStockResponse {
  holdingStockData: StockHold[] | null;
  holdingStockLoading: boolean;
  holdingStockError: boolean | null;
}

export interface StockChartOptions {
  options: any; // echarts options type
  chartStyle: {
    width: string;
    height: string;
  };
  loading: boolean;
}

export interface UseSocketReturn {
  stompClient: Client | null;
  connected: boolean;
  error: Error | null;
  messages: ChatMessage[];
  connectedUsers: string[];
  sendMessage: (chatMessage: ChatMessage) => void;
  joinRoom: (chatMessage: ChatMessage) => void;
}

interface TradeStockParams {
  companyId: number;
  price: number;
  stockCount: number;
  memberId: number;
}






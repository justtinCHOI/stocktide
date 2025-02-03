import { extractedCompanyData } from '@typings/hooks';

export interface StockMinData {
  stockMinId: number;
  companyId: number;
  stockTradeTime: string; // 주식 체결 시간 (LocalDateTime)
  stck_cntg_hour: string; // 주식 체결 시간 (String)
  stck_prpr: string; // 주식 현재가
  stck_oprc: string; // 주식 시가
  stck_hgpr: string; // 주식 최고가
  stck_lwpr: string; // 주식 최저가
  cntg_vol: string; // 체결 거래량
}

export interface ChartData {
  time: string[];
  tooltipTitle: string[];
  values: number[][];
  volumes: number[][];
}

export interface CompareChartData {
  name: string;
  type: string;
  data: (string | number)[];
  smooth: boolean;
  lineStyle: {
    opacity: number;
    color: string;
  };
  yAxisIndex: number;
}

export interface ChartOptions {
  animation: boolean;
  legend: any;
  tooltip: any;
  axisPointer: any;
  toolbox: any;
  brush: any;
  visualMap: any;
  grid: any[];
  xAxis: any[];
  yAxis: any[];
  dataZoom: any[];
  series: any[];
}

export interface StockChartResponse {
  options: ChartOptions | null;
  chartStyle: {
    width: string;
    height: string;
  };
  loading: boolean;
}


export interface MoveStockItemProps {
  company: extractedCompanyData;
  setShowChangePrice: (show: boolean) => void;
  showChangePrice: boolean;
  onclick: () => void;
}

export interface TestStockItemProps {
  company: {
    companyId: number;
    code: string;
    korName: string;
  };
  onclick: () => void;
}

// 1) 차트 데이터 정리 (x축 날짜 데이터, y축 종가 및 거래량 데이터)
import { ChartData, StockMinData } from '@typings/stock';

export const organizeData = (rawData: StockMinData[]) => {

  if (!rawData || rawData.length === 0) {
    console.warn("Raw data is empty or undefined");
    return {
      time: [],
      tooltipTitle: [],
      values: [],
      volumes: [],
    };
  }
  const tooltipTitle = [];
  const time = [];
  const values = [];
  const volumes = [];

  for (let i = 0; i < rawData.length; i++) {
    const date = new Date(rawData[i].stockTradeTime);

    // 1) x축 날짜
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const priceTime = `${hour}:${minute}`;
    time.push(priceTime);

    // 2) 툴팁 날짜
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];

    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const dayOfWeek = dayList[date.getDay()];
    const tooltipDay = `${year}.${month}.${day}(${dayOfWeek}) ${priceTime}`;
    tooltipTitle.push(tooltipDay);

    // 3) 주가
    const openPrice = parseInt(rawData[i].stck_oprc);
    const closePrice = parseInt(rawData[i].stck_prpr);
    const lowestPrice = parseInt(rawData[i].stck_lwpr);
    const highestPrice = parseInt(rawData[i].stck_hgpr);
    values.push([openPrice, closePrice, lowestPrice, highestPrice]);

    // 4) 거래량
    const volume = parseInt(rawData[i].cntg_vol);
    const priceChange = openPrice < closePrice ? 1 : -1;
    volumes.push([i, volume, priceChange]);
  }
  return {
    time: time,
    tooltipTitle: tooltipTitle,
    values: values,
    volumes: volumes,
  };
};

// 2) 이동 평균선 데이터 계산
// function calculateMovingAvgLine(minuteCount: number, data: OrganizedChartProps) {
export function calculateMovingAvgLine(minuteCount: number, data: ChartData) {
  const result = [];
  const length = data.values.length;

  for (let i = 0; i < length; i++) {
    if (i < minuteCount) {
      result.push("-");
      continue;
    }

    let sum = 0;
    for (let j = 0; j < minuteCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / minuteCount).toFixed(3));
  }
  return result;
}

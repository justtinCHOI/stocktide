import { useCallback, useEffect, useMemo, useState } from 'react';
import useGetStockData from './useGetStockData';
import useGetStockInfo from './useGetStockInfo';
import axios from 'axios';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { CompareChartData } from '@typings/stock';
import { calculateMovingAvgLine, organizeData } from '@utils/stockUtil';

const BASE_URL = import.meta.env.VITE_API_URL;

const upColor = "rgba(198, 6, 6, 0.37)";
const downColor = "rgba(59, 119, 247, 0.51)";
const volumeColor = "rgba(57, 118, 249, 0.56)";
const pointerColor = "#cc3c3a";
const indexColor = "#4479c2";
const averageLineMinute = 10;
const averageDay = 10;

const useGetStockChart = (companyId: number) => {
    const { stockPrice, stockPriceLoading } = useGetStockData(companyId);
    const { stockInfo, stockInfoLoading } = useGetStockInfo(companyId);

    const [corpName, setCorpName] = useState("");
    const [chartData, setChartData] = useState([]); // StockProps[] : 봉 배열

    // 비교차트 설정 (10일 기준, 이동 평균선)
    const compareId = useSelector((state: RootState) => state.compareIdSlice);
    const { stockInfo: compareInfo } = useGetStockInfo(compareId);
    const [compareName, setCompareName] = useState("");
    const [compareChart, setCompareChart] = useState<CompareChartData | undefined>(undefined);

    // 회사정보 -> 회사이름, 봉 420개 -> chartData
    useEffect(() => {
        if (stockPrice && stockInfo) {
            setCorpName(stockInfo.korName); // 마르하벤, Marhaban, 봉쥬
            setChartData(stockPrice);
        }
    }, [stockPrice, stockInfo]);

    // 비교회사정보 -> 비교회사이름
    useEffect(() => {
        if (compareInfo && compareId !== null) {
            const compareStockName = compareInfo.korName;
            setCompareName(compareStockName);
        }
    }, [compareId, compareInfo]);

    // 비교회사이름 -> 비교회사차트
    useEffect(() => {
        if (compareName && compareId !== null) {
            getCompareChart(compareId, compareName).then();
        }
    }, [compareName]);

    // 회사정보 X -> 비교 회사차트 X
    useEffect(() => {
        if (companyId === null) {
            setCompareChart(undefined);
        }
    }, [companyId, compareId, compareName]);

    // 데이터 유효성 검증 및 정리_ chartData -> organizedChartData
    const organizedChartData = useMemo(() => {
        if (!chartData || chartData.length === 0) {
            return {
                time: [],
                tooltipTitle: [],
                values: [],
                volumes: [],
            };
        }
        return organizeData(chartData);
    }, [chartData]);
    const movingAvgLine = calculateMovingAvgLine(averageLineMinute, organizedChartData);

    const getCompareChart =  useCallback(async (compareId: number, compareName: string) => {
        const response = await axios.get(`${BASE_URL}/api/company/charts/${compareId}`);
        const data = await response.data;

        const compareChartData = organizeData(data);
        const compareMovingAvgData = calculateMovingAvgLine(averageDay, compareChartData);
        const compareMovingAvgChart = {
            // name: `${compareName}`,
            name: compareName,
            type: "line",
            data: compareMovingAvgData,
            smooth: true,
            lineStyle: {
                opacity: 0.5,
                color: "#738f8fc7",
            },
            yAxisIndex: 2,
        };

        setCompareChart(compareMovingAvgChart);
    }, []);

    // 데이터 유효성 검증 및 정리_ organizedChartData -> { options, chartStyle }
    const options = useMemo(() => {
        if (!organizedChartData || organizedChartData.values.length === 0) {
            return null;
        }

        const series = [
              {
                  name: `주가`,
                  type: "candlestick",
                  data: organizedChartData.values,
                  itemStyle: {
                      color: upColor,
                      color0: downColor,
                      borderColor: undefined,
                      borderColor0: undefined,
                  },
                  yAxisIndex: 0,
              },
              {
                  name: `이동평균선 (${averageLineMinute}분)`,
                  type: "line",
                  data: movingAvgLine,
                  smooth: true,
                  lineStyle: {
                      opacity: 0.5,
                  },
              },
              {
                  name: `거래량`,
                  type: "bar",
                  xAxisIndex: 1,
                  data: organizedChartData.volumes,
                  yAxisIndex: 1,
                  itemStyle: {
                      color: volumeColor,
                  },
              },
                compareChart ? compareChart : null,
          ];

        // // Conditionally add comparison chart if it exists
        // if (compareChart) {
        //     console.log("compareChart", compareChart);
        //     series.push(compareChart as CompareChartData);
        // }

        // Chart options 정의
        return {
            animation: true,
            legend: {
                top: 10,
                left: "left",
                padding: [4, 0, 0, 15],
                data: [`주가`, `거래량`, `이동평균선 (${averageLineMinute}분)`, `${compareName}`],
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
                formatter: (params: any) => {
                    const dataIndex = params[0]?.dataIndex || 0;

                    const openPriceText = "• 시가";
                    const closePriceText = "• 종가";
                    const highPriceText = "• 고가";
                    const lowPriceText = "• 저가";
                    const volumeText = "• 거래량";
                    const priceUnit = " 원";
                    const volumeUnit = " 주";

                    const date = organizedChartData.tooltipTitle[dataIndex];
                    const name = `📈 ${corpName}`;
                    const dataPoint = organizedChartData.values[dataIndex];
                    const openPrice = dataPoint[0].toLocaleString();
                    const closePrice = dataPoint[1].toLocaleString();
                    const highPrice = dataPoint[2].toLocaleString();
                    const lowPrice = dataPoint[3].toLocaleString();
                    const volume = organizedChartData.volumes[dataIndex][1].toLocaleString();

                    return `
        <div style="line-height: 20.5px;">
          <div style="font-weight: 600; font-size: 13px; color:#e22926;">${date}</div>
          </br>
          <div style="font-weight: 600;">${name}</div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${openPriceText}</span>
            <span>${openPrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${closePriceText}</span>
            <span>${closePrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${highPriceText}</span>
            <span>${highPrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${lowPriceText}</span>
            <span>${lowPrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${volumeText}</span>
            <span>${volume}${volumeUnit}</span>
          </div>
        </div>
        `;
                },
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 15,
                textStyle: {
                    color: "#000",
                    fontSize: 12.5,
                },
            },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: "all",
                    },
                ],
                label: {
                    color: pointerColor,
                    backgroundColor: "transparent",
                },
            },
            toolbox: { show: false },
            brush: {
                xAxisIndex: "all",
                brushLink: "all",
                outOfBrush: {
                    colorAlpha: 0.1,
                },
            },
            visualMap: {
                show: false,
                seriesIndex: 5,
                dimension: 2,
                pieces: [
                    {
                        value: 1,
                        color: downColor,
                    },
                    {
                        value: -1,
                        color: upColor,
                    },
                ],
            },
            grid: [
                {
                    containLabel: true,
                    top: "0%",
                    left: "0%",
                    right: "0%",
                    height: "72.5%",
                },
                {
                    containLabel: true,
                    left: "0%",
                    right: "0%",
                    top: "72.6%",
                    height: "27%",
                },
            ],
            xAxis: [
                {
                    type: "category",
                    data: organizedChartData.time,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "black",
                            width: 1,
                            type: "solid",
                        },
                    },
                    splitLine: { show: false, interval: 100 },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                    min: "dataMin",
                    max: "dataMax",
                    gridIndex: 0,
                    axisPointer: {
                        z: 100,
                    },
                },
                {
                    type: "category",
                    gridIndex: 1,
                    data: organizedChartData.time,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "black",
                            width: 1,
                            type: "solid",
                        },
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        show: true,
                        interval: Math.ceil(organizedChartData.time.length / 13),
                        showMinLabel: false,
                        showMaxLabel: false,
                        color: "black",
                    },
                    min: "dataMin",
                    max: "dataMax",
                },
            ],
            yAxis: [
                {
                    scale: true, // Y축의 값 0을 강제로 포함 X
                    splitArea: {
                        show: true,
                    },
                    splitLine: {
                        show: false,
                    },
                    position: "right",
                    axisLabel: {
                        fontSize: "12px",
                        color: indexColor,
                        fontWeight: "500",
                        showMinLabel: false,
                        showMaxLabel: false,
                        inside: true,
                        padding: 7,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "black",
                            width: 0,
                            type: "solid",
                        },
                    },
                    gridIndex: 0,
                },
                {
                    scale: true,
                    position: "right",
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: true, inside: true, color: indexColor, padding: 10, showMinLabel: false, showMaxLabel: false, fontWeight: "500" },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: {
                        show: true,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "black",
                            width: 1,
                            type: "solid",
                        },
                    },
                },
                chartData !== undefined && {
                    scale: true,
                    splitArea: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    position: "left",
                    axisLabel: {
                        fontSize: "12px",
                        color: "#9999",
                        fontWeight: "500",
                        showMinLabel: false,
                        showMaxLabel: false,
                        inside: true,
                        padding: 7,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "black",
                            width: 0,
                            type: "solid",
                        },
                    },
                    gridIndex: 0,
                },
            ],
            dataZoom: [
                {
                    type: "inside",
                    xAxisIndex: [0, 1],
                    start: 0.5,
                    end: 99.5,
                },
            ],
            series: series,
        };
    }, [corpName, chartData, compareName, compareChart, organizedChartData, movingAvgLine]);

    const chartStyle = {
        width: "100%",
        height: "100% ",
    };

    return {
        options,
        chartStyle,
        loading: stockPriceLoading || stockInfoLoading
    };
};

export default useGetStockChart;

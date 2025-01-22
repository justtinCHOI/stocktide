import {useSelector} from "react-redux";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import jwtAxios from "@utils/jwtUtil";
import {API_SERVER_HOST} from "@api/memberApi";
import {useParams} from "react-router";
import { RootState } from '@/store';

const host = `${API_SERVER_HOST}/api/stock`;

const useTradeStock = () => {
    const { companyId } = useParams();
    const numericCompanyId = companyId ? parseInt(companyId, 10) : 0;
    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);
    const orderVolume = useSelector((state: RootState) => state.stockOrderVolumeSlice);

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            // 주문 수량 검증 추가
            if (!orderVolume || orderVolume <= 0) {
                throw new Error('Invalid order volume');
            }

            return postOrderRequest(
              orderType,
              numericCompanyId,
              orderPrice,
              orderVolume,
            );
        },
        onSuccess: () => {
            // 관련 쿼리들 무효화
            queryClient.invalidateQueries({
                queryKey: ['cash']
            });
            queryClient.invalidateQueries({
                queryKey: ['holdingStock']
            });
            queryClient.invalidateQueries({
                queryKey: ['orderRecord']
            });
            queryClient.invalidateQueries({
                queryKey: ['stockHolds']
            });
            queryClient.invalidateQueries({
                queryKey: ['money']
            });
        },
        onError: (error) => {
            console.error('Trade failed:', error);
            throw error; // 에러를 상위로 전파
        }
    });

};

export default useTradeStock;

const postOrderRequest = async (orderType:boolean , companyId:number, price:number, volume:number) => {
    if (!orderType) {
        // 매수
        const response = await jwtAxios.post(`${host}/buy?companyId=${companyId}&price=${price}&stockCount=${volume}`);
        return response.data;
    } else {
        // 매도
        const response = await jwtAxios.post(`${host}/sell?companyId=${companyId}&price=${price}&stockCount=${volume}`);
        return response.data;
    }
};

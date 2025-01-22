import { useQuery } from "@tanstack/react-query";
import jwtAxios from "@utils/jwtUtil";
import { API_SERVER_HOST } from "@api/memberApi";
import { StockHoldResponseDto } from '@typings/dto'
import useCustomMember from '@hooks/useCustomMember';

const host = `${API_SERVER_HOST}/api/stock`;

const getHoldingStock = async (): Promise<StockHoldResponseDto[]> => {
    const response = await jwtAxios.get(`${host}/stockholds`);
    return response.data;
};

const useGetHoldingStock = () => {
    const { isLogin, loginState } = useCustomMember();


    const { data, isLoading, isError } = useQuery({
        queryKey: ['holdingStocks', loginState.memberId],
        queryFn: () => getHoldingStock(),
        enabled: isLogin,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true
    });

    return { holdingStockData: data, holdingStockLoading: isLoading, holdingStockError: isError };
};

export default useGetHoldingStock;

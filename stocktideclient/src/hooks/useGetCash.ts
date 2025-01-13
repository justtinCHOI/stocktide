import { useQuery } from "@tanstack/react-query";
import jwtAxios from "@utils/jwtUtil";
import { API_SERVER_HOST } from "@api/memberApi";
import { GetCashResponse } from '@typings/hooks';
import useCustomMember from '@hooks/useCustomMember';

const host = `${API_SERVER_HOST}/api/cash`;

const getCashData = async (memberId: number): Promise<number> => {
    const response = await jwtAxios.get(`${host}/one/${memberId}`);
    return response.data.money;
};

const useGetCash = (): GetCashResponse => {
    const { loginState } = useCustomMember();
    const isLogin = !!loginState.email;
    const memberId = loginState.memberId;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['cash', memberId],
        queryFn: () => getCashData(memberId),
        enabled: isLogin,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    });

    return { cashData: data, cashLoading: isLoading, cashError: isError };
};

export default useGetCash;

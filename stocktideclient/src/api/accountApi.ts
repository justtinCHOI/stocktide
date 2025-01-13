
const API_SERVER_HOST = import.meta.env.VITE_API_URL;
import jwtAxios from '@utils/jwtUtil';

const host = `${API_SERVER_HOST}/api/cash`

export const getCashList = async (memberId: number) => {
    const res = await jwtAxios.get(`${host}`, {
        params: {memberId}
    });
    return res.data;
}

export const createCash = async (memberId: number) => {
    const res = await jwtAxios.post(`${host}`, null, {
        params: {memberId}
    });
    return res.data;
}

export const deleteCash = async (cashId: number) => {

    const res = await jwtAxios.delete(`${host}/${cashId}`);

    return res.data;
}

export const updateCash = async (cashId: number, money: number, dollar: number) => {

    const res = await jwtAxios.put(`${host}/${cashId}`,null, {
        params: {money, dollar }
    });

    return res.data;
}
//////

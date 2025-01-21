const API_SERVER_HOST = import.meta.env.VITE_API_URL;
import jwtAxios from '@utils/jwtUtil';

const prefix = `${API_SERVER_HOST}/api`

export const getTest1 = async() => {
    const response = await jwtAxios.get(`${prefix}/test/test1`);
    return response.data;
}

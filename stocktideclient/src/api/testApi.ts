const API_SERVER_HOST = import.meta.env.VITE_API_URL;
import jwtAxios from '@utils/jwtUtil';

const prefix = `${API_SERVER_HOST}/api`


export const getMemberTest = async() => {
    try {
        const res = await jwtAxios.get(`${prefix}/member/test`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Test API Error:', error);
        throw error;
    }
}
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getLocalStorage, setLocalStorage } from "./localStorageUtil"; // localStorage 유틸리티 파일로 변경
const API_SERVER_HOST = import.meta.env.VITE_API_URL;

const jwtAxios = axios.create();

const refreshJWT = async (accessToken: string, refreshToken: string): Promise<any> => {
    console.log('refreshJWT', refreshToken);
    try {
        const host = API_SERVER_HOST;
        const header = { headers: { Authorization: `Bearer ${accessToken}` } };
        const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header);
        return res.data;
    } catch (error) {
        console.error('Failed to refresh JWT:', error);
        throw new Error('REFRESH_TOKEN_FAILED');
    }
};

const beforeReq = async (config: InternalAxiosRequestConfig) => {
    try {
        console.log('[REQUEST] beforeReq:', config.url);

        const memberInfo = getLocalStorage("member");
        if (!memberInfo) {
            return Promise.reject({
                response: { data: { error: "REQUIRE_LOGIN" } }
            });
        }

        const accessToken = memberInfo.accessToken;
        if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    } catch (err) {
        console.error('[REQUEST] Error in beforeReq:', err);
        return Promise.reject(err);
    }
};

const requestFail = (err: any) => {
    console.error('[REQUEST] requestFail:', err);
    return Promise.reject(err);
};

const beforeRes = async (res: AxiosResponse) => {
    try {
        console.log('[RESPONSE] beforeRes:', res.config.url);

        const data = res.data;
        if (data?.error === 'ERROR_ACCESS_TOKEN' ||
          data?.error === 'Expired' ||
          res.status === 401) {

            const memberInfo = getLocalStorage("member");
            if (!memberInfo) {
                throw new Error('REQUIRE_LOGIN');
            }

            const result = await refreshJWT(
              memberInfo.accessToken,
              memberInfo.refreshToken
            );

            if (!result) {
                throw new Error('JWT refresh failed');
            }

            // Update tokens
            memberInfo.accessToken = result.accessToken;
            memberInfo.refreshToken = result.refreshToken;
            setLocalStorage("member", memberInfo, 1);

            // Retry original request
            const originalRequest = res.config;
            originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
            return jwtAxios(originalRequest);
        }

        return res;
    } catch (err) {
        console.error('[RESPONSE] Error in beforeRes:', err);
        return Promise.reject(err);
    }
};

const responseFail = (err: any) => {
    console.error('[RESPONSE] responseFail:', err);
    return Promise.reject(err);
};


jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;

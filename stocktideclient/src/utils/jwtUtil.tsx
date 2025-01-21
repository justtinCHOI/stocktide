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

const beforeReq = (config: InternalAxiosRequestConfig) => {
    console.log('beforeReq', config);

    const memberInfo = getLocalStorage("member");

    if (!memberInfo) {
        return Promise.reject({
            response: {
                data: { error: "REQUIRE_LOGIN" }
            }
        });
    }

    const accessToken = memberInfo.accessToken;

    if (config.headers) {
        // Authorization 헤더 처리
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
};

const requestFail = (err: any) => {
    console.error('request fail', err);
    return Promise.reject(err);

};

const beforeRes = async (res: AxiosResponse) => {
    console.log("beforeRes", res);
    const data = res.data;

    if (data && data.error === 'ERROR_ACCESS_TOKEN' || data.error === 'Expired' || res.status === 401) {
        //에러가 발생한다면? (token 문제)
        //쿠키에서 refreshToken 을 가져와서 새로운 token 을 생성
        // 사용자가 axios 요청을 하고 에러가 발생할 떄마다 갱신된 값을 다시 저장
        const memberLocalStorageValue = getLocalStorage("member");

        if (!memberLocalStorageValue) {
            // memberCookieValue가 없을 때 예외 처리
            return Promise.reject({
                response: {
                    data: { error: 'REQUIRE_LOGIN' },
                },
            });
        }

        const result = await refreshJWT(memberLocalStorageValue.accessToken, memberLocalStorageValue.refreshToken);

        if (!result) {
            throw new Error('JWT refresh failed');
        }
        memberLocalStorageValue.accessToken = result.accessToken;
        memberLocalStorageValue.refreshToken = result.refreshToken;
        setLocalStorage("member", memberLocalStorageValue, 1);

        //원래의 호출 을 accessToken 을 header 에 넣어서 다시 요청
        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return jwtAxios(originalRequest);
    }

    return res;
};

const responseFail = (err: any) => {
    console.error('responseFail', err);
    return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;

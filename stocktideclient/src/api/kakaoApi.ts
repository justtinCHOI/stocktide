import axios from 'axios';

const API_SERVER_HOST = import.meta.env.VITE_API_URL;
const API_REDIRECT_URI = import.meta.env.VITE_CLIENT_URL;

const rest_api_key =`8f46337bde852c2d39573c6c60acfd65` //REST키값

const redirect_uri =`${API_REDIRECT_URI}/member/kakao`

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url =`https://kauth.kakao.com/oauth/token`

//1. 인가코드 얻기
export const getKakaoLoginLink = () => {
  return `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
}

//2. accessToken 받기
export const getAccessToken = async (authCode: string) => {

  const header = {
   headers: {
     "Content-Type": "application/x-www-form-urlencoded",
   }
  }
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code:authCode
  }

  const res = await axios.post(access_token_url, params , header)

  return res.data.access_token
}

//3. 사용자 정보 얻기
export const getMemberWithAccessToken = async(accessToken: string) => {

  const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)

  return res.data

}

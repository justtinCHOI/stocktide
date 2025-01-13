import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import useCustomMember from "@hooks/useCustomMember";
import {getAccessToken, getMemberWithAccessToken} from "@api/kakaoApi";
import {IncludeInformationDiv, OutletDiv} from "@assets/css/menu";
import { loginSuccess } from '@slices/memberSlice';
import { toast } from 'react-toastify';

const KakaoRedirect = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const authCode = searchParams.get("code") //인증코드

    const { moveToPath} = useCustomMember()

    //getKakaoLoginLink : kakaoURL -> 인가코드
    //getAccessToken : 인가코드 -> accessToken
    //getMemberWithAccessToken : accessToken -> info

    useEffect(() => {
        if(authCode){
            getAccessToken(authCode).then(accessToken => {
                getMemberWithAccessToken(accessToken).then(memberInfo => {
                    dispatch(loginSuccess(memberInfo))
                    if (memberInfo) {
                        if (memberInfo.email) {
                            moveToPath("/");
                            toast.success("카카오 로그인 성공!");
                        } else {
                            toast.info("일반회원으로 전환이 필요합니다");
                            if (confirm("일반회원으로 전환하시겠습니까?")) {
                                moveToPath("/my/modify");
                            }
                        }
                    }
                })
            })
        }
    }, [authCode])

    return (
        <IncludeInformationDiv $top={2}>
            <OutletDiv>
                <div>Kakao Login Redirect</div>
                <div>{authCode}</div>
            </OutletDiv>
        </IncludeInformationDiv>
    )
}

export default KakaoRedirect;

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import {login} from "../../slices/loginSlice"
import useCustomLogin from "../../hooks/useCustomLogin"
const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams()
    const {moveToPath} = useCustomLogin()
    const authCode = searchParams.get("code")
    const dispatch = useDispatch()

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            getMemberWithAccessToken(accessToken).then(memberInfor=>{
                console.log("-----------------------")
                console.log(memberInfor)
                dispatch(login(memberInfor))

                if(memberInfor && memberInfor.social){
                    moveToPath("/member/modify")
                }else{
                    moveToPath("/")
                }
            })
        })
    }, [authCode])
    return (
    <div>
        <div>Kakao Login Redirect</div>
        <div>{authCode}</div>
    </div>
)
}
export default KakaoRedirectPage;
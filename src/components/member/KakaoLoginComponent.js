import React from 'react';
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from '../../api/kakaoApi';

const link=getKakaoLoginLink()

function KakaoLoginComponent(props) {
    return (
        <div className="flex flex-col">
            <div className="text-center text-green m-4">로그인시에 자동 가입처리 됩니다</div>
                <div className="flex justify-center w-full">
                    <div
                    className="text-xl text-center text-green font-bold w-2/5 bg-green
                    shadow-sm rounded p-2">
                    <Link to={link} className="no-underline-link" >KAKAO LOGIN</Link>
                </div>
            </div>
        </div>
    );
}

export default KakaoLoginComponent;
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { modify, deleted } from '../../api/memberApi'; // API 함수 임포트
import { logout } from "../../slices/loginSlice";

function MypageComponent() {
  const user = useSelector(state => state.loginSlice);
  const dispatch = useDispatch(); // Redux dispatch 함수
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [editing, setEditing] = useState(false);
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState(user.nickname);

  // 정보 저장 함수
  const handleSave = async () => {
    try {
      // modify API 호출 시 email을 보내지 않음
      const data = await modify({
        pw,
        nickname
      });

      console.log('정보가 저장되었습니다:', data);

      // 상태 업데이트
      dispatch({ type: 'UPDATE_USER', payload: { nickname } });

      setEditing(false);
      alert('정보가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('정보 저장 중 오류 발생:', error);
      alert('정보 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // 회원 탈퇴 함수
  const handleDeleteAccount = async () => {
    try {
      // deleted API 호출 시 email을 보내지 않음
      const data = await deleted({}); // deleteParam을 비워둠

      console.log('회원 탈퇴 완료:', data);

      // 상태 초기화 및 리디렉션
      dispatch(logout());
      navigate('/member/login'); // 로그인 페이지로 리디렉션
      alert('회원 탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Container className="bg-white rounded-lg shadow-md flex flex-col items-center mb-20">
      <h1 className="text-3xl font-bold text-green text-center ">마이페이지</h1>
      <div className="space-y-4 mt-5 w-full max-w-xs ">
        {editing ? (
          <>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-gray-700">이메일:</label>
              <input
                type="email"
                id="email"
                value={user.email}
                readOnly
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 w-full"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="pw" className="text-gray-700">비밀번호 변경:</label>
              <input
                type="password"
                id="pw"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="nickname" className="text-gray-700">닉네임:</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-green text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                저장
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                취소
              </button>
            </div>
            <div className="h-10"> </div>
          </>
        ) : (
          <>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>닉네임:</strong> {nickname}</p>
            <p><strong>계정 정보:</strong> {user.isAdmin ? '관리자' : '일반 사용자'}</p>
            <div className="flex justify-center space-x-4 mt-5">
              <button
                onClick={() => setEditing(true)}
                className="bg-green text-white px-4 py-2 rounded-lg  hover:bg-green-600"
              >
                정보 수정
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                회원 탈퇴
              </button>
            </div>
            <div className="h-10"> </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default MypageComponent;

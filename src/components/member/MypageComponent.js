import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/mypage.css'; // CSS 파일 임포트

function MypageComponent() {
  const user = useSelector(state => state.loginSlice);
  const dispatch = useDispatch(); // Redux dispatch 함수
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState('');

  // 정보 저장 함수
  const handleSave = async () => {
    try {
      const response = await fetch('/api/member/modify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Assuming you're using token-based authentication
        },
        body: JSON.stringify({
          email: user.email, // 이메일을 고유키로 사용
          nickname,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save user information');
      }

      const data = await response.json();
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
      const response = await fetch('/api/member/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Assuming you're using token-based authentication
        },
        body: JSON.stringify({ email: user.email }) // 이메일을 고유키로 사용
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      const data = await response.json();
      console.log('회원 탈퇴 완료:', data);

      // 상태 초기화 및 리디렉션
      dispatch({ type: 'LOGOUT' });
      navigate('/member/login'); // 로그인 페이지로 리디렉션
      alert('회원 탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Container className="my-page-container">
      <h1 className="my-page-heading">마이페이지</h1>
      <div className="my-page-info">
        {editing ? (
          <>
            <div className="form-group">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                id="email"
                value={user.email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호 변경:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nickname">닉네임:</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            
            <button onClick={handleSave} className="btn btn-primary">저장</button>
            <button onClick={() => setEditing(false)} className="btn btn-secondary">취소</button>
          </>
        ) : (
          <>
            <h2>정보</h2>
            <p><strong>닉네임:</strong> {nickname}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>계정 정보:</strong> {user.isAdmin ? '관리자' : '일반 사용자'}</p>
            <button onClick={() => setEditing(true)} className="btn btn-primary">정보 수정</button>
            <div className="my-page-links">
              <Link to="/member/change-password">비밀번호 변경</Link>
              <button onClick={handleDeleteAccount} className="btn btn-danger">회원 탈퇴</button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default MypageComponent;

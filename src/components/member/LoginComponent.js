import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트


const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({
    email: '',
    pw: ''
  });
  
  const navigate = useNavigate(); // useNavigate 훅 사용

  const { doLogin, moveToPath } = useCustomLogin();

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLoginParam({
      ...loginParam,
      [e.target.name]: e.target.value
    });
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await doLogin(loginParam);
      
      if (data.error) {
        alert("이메일과 패스워드를 다시 확인하세요");
        //setMessage('Login failed: ' + error.message);
      } else {
        moveToPath('/');
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage('Login failed: ' + error.message);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };
  
  const handleSignupClick = () => {
    navigate('/member/signup'); // 회원가입 페이지로 이동
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-green font-bold">Login</h2>
          <Form onSubmit={handleClickLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-green">Email address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginParam.email}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="text-green">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="pw"
                value={loginParam.pw}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" className="custom-button mr-2">
                LOGIN
              </Button>
              {message && <p>{message}</p>}
              <Button type="button" className="custom-button" style={{ backgroundColor: '#BFBFBF' }} onClick={handleSignupClick}>
                SIGNUP
              </Button>
            </div>
          </Form>
          <KakaoLoginComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;

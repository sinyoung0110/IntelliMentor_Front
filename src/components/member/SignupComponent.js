import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useCustomLogin from "../../hooks/useCustomLogin";
import { signupPost } from '../../api/memberApi'; // signupPost 함수 import

const SignUp = () => {
  const { moveToPath } = useCustomLogin();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      try {
        const signupData = {
          email: formData.email,
          pw: formData.password,
          pwCheck: formData.confirmPassword,
          nickname: formData.nickname
        };
        const response = await signupPost(signupData);
        alert("Form submitted successfully!");
        moveToPath('/');
      } catch (error) {
        console.error("Signup error:", error);

        // 서버에서 보낸 에러 메시지 확인
        const errorMessage = error.response?.data?.ERROR_MESSAGE || "An error occurred during signup. Please try again.";
        
        alert(errorMessage); // 에러 메시지를 사용자에게 보여줌
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 text-green">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4 font-bold">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formNickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" className="custom-button">
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

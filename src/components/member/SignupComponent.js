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
        alert("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2>Sign Up</h2>
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
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

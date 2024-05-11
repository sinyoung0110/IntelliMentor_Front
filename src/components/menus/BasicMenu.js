import { Link } from 'react-router-dom';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function BasicMenu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">IntelliMentor</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/voca/">단어장</Nav.Link>
            <Nav.Link as={Link} to="/study/">스터디</Nav.Link>
            <Nav.Link as={Link} to="/notice/">게시판</Nav.Link>
          </Nav> 
          <Nav>
            <Nav.Link as={Link} to="/login">로그인</Nav.Link>
            <Nav.Link eventKey={2}as={Link} to="/signup">
              회원가입
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicMenu;
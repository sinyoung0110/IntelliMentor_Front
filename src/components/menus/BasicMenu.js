import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";

function BasicMenu() {
  const loginState = useSelector(state => state.loginSlice);
  const location = useLocation(); // To get the current route
  const dispatch = useDispatch();
  
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  const handleClickLogout = () => {
    dispatch(logout());
  };

  const handleStudyClick = (e) => {
    e.preventDefault(); // 기본 링크 동작 방지
    setShowModal(true);  // 모달 열기
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  const textOutlineStyle = {
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    color: '#8FB299',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
    letterSpacing: '0.05em'
  };

  // Define common styles
  const baseLinkStyle = {
    fontSize: '1.5rem', // Adjust font size as needed
    fontWeight: 'bold',
    color: '#BFBFBF',
    marginLeft: '15px'
  };

  // Define styles for the active link
  const activeLinkStyle = {
    ...baseLinkStyle,
    color: '#8EB298' // Highlight color for the active link
  };
  
  const baseMemberStyle = {
    fontSize: '1.25rem', // Adjust font size as needed
    color: '#BFBFBF',
    marginLeft: '15px'
  };

  const activeMemberStyle = {
    ...baseMemberStyle,
    color: '#8EB298' // Highlight color for the active link
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <Navbar.Brand as={Link} to="/" style={ textOutlineStyle }>IntelliMentor</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/voca/"
                style={isActive('/voca/') ? activeLinkStyle : baseLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/voca/') ? '#8EB298' : '#BFBFBF'}
              >
                Vocabularay
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/study/" 
                onClick={handleStudyClick} // Study 클릭 시 모달 오픈
                style={isActive('/study/') ? activeLinkStyle : baseLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/study/') ? '#8EB298' : '#BFBFBF'}
              >
                Study
              </Nav.Link>
              <Nav.Link as={Link} to="/faq"
                style={isActive('/faq') ? activeLinkStyle : baseLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/faq') ? '#8EB298' : '#BFBFBF'}
              >
                FAQ
              </Nav.Link>
            </Nav>
            {loginState.email ? 
            <Nav>
              <Nav.Link as={Link} to="/member/mypage" style={isActive('/member/mypage') ? activeMemberStyle : baseMemberStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/member/mypage') ? '#8EB298' : '#BFBFBF'}
              >MyPage</Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="/" style={isActive('/logout') ? activeMemberStyle : baseMemberStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/logout') ? '#8EB298' : '#BFBFBF'}
                onClick={handleClickLogout}
              >
                Log out
              </Nav.Link>
            </Nav>
            :
            <Nav>
              <Nav.Link as={Link} to="/member/login" style={isActive('/member/login') ? activeMemberStyle : baseMemberStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/member/login') ? '#8EB298' : '#BFBFBF'}
              >Log in</Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="/member/signup" style={isActive('/member/signup') ? activeMemberStyle : baseMemberStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8EB298'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive('/member/signup') ? '#8EB298' : '#BFBFBF'}
              >
                Sign up
              </Nav.Link>
            </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Study 클릭 시 모달 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>개발 중</Modal.Title>
        </Modal.Header>
        <Modal.Body>Study 페이지는 아직 개발 중입니다. 조금만 기다려 주세요!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BasicMenu;

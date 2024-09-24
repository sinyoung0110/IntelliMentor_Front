import React from 'react';
import BasicMenu from "../components/menus/BasicMenu";
import Footer from "../components/menus/Footer";
import { Container } from 'react-bootstrap';
import '../App.css';
import '../styles/learn.css';  // Adjust based on the actual path

function BasicLayout({children}) {
  return (
    <>
      <BasicMenu/>
      <Container>  {/* 좌우 여백 추가 */}
        <div>
          <main 
            className="w-full px-5 py-5"> {/* 상단 여백 py-40 */}
            {children}
          </main>
        </div>
      </Container>
      <Footer/>
    </>
  );
}

export default BasicLayout;

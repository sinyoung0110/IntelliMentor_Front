import React from 'react';
import BasicMenu from "../components/menus/BasicMenu";
import Footer from "../components/menus/Footer";
import { Container } from 'react-bootstrap';

function BasicLayout({children}) {
  return (
    <>
      <BasicMenu/>
      <Container>
        <div>
          <main 
            className="w-full px-5 py-5"> {/* 상단 여백 py-40 변경 flex 제거 */}
            {children}
          </main>
        </div>
      </Container>
      <Footer/>
    </>
    );
}

export default BasicLayout;

import React from "react";
import { Container } from 'react-bootstrap';
import LoginComponent from "../../components/member/LoginComponent";
import BasicMenu from "../../components/menus/BasicMenu";
const LoginPage = (props) => {
  return (<>
    <BasicMenu/>
    <Container>
      <LoginComponent />
    </Container>
    </>
    );
}
export default LoginPage;
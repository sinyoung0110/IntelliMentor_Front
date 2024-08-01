import React from 'react';
import { Container } from 'react-bootstrap';
import BasicMenu from "../../components/menus/BasicMenu";
import SignupComponent from "../../components/member/SignupComponent";

function SignupPage() {

  return (<>
  <BasicMenu/>
  <Container>
    <SignupComponent />
  </Container>
  </>
  );
}

export default SignupPage;
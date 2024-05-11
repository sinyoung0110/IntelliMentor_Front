
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
function SignupPage() {
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <div className="text-center mb-3">
    <h1>IntelliMentor</h1>
    <p>Sign up with:</p>

    <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='n' size="sm"/>
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='k' size="sm"/>
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='google' size="sm"/>
      </MDBBtn>
    </div>

    <p className="text-center mt-3">or:</p>
  </div>

  <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
  <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
  <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
  <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

  <div className='d-flex justify-content-center mb-4'>
    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
  </div>

  <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
  </MDBContainer>
  );
}

export default SignupPage;
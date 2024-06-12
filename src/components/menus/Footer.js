import React from 'react';

export default function Footer() {
  return (
    <footer className='text-center text-white' style={{ backgroundColor: '#21081a' }}>
      <container className='p-4'></container>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          IntelliMentor.com
        </a>
      </div>
    </footer>
  );
}
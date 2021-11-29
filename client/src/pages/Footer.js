import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='box-footer'>
        <img alt='logo' src='img/logo_white.svg' onClick={()=>{window.location.replace('/')}}/>
        <div className='slogan'>나의 헬스 메이트, 쉘 위 헬스</div>
        <div className='creator'>Creator</div>
        <ul>
          <li>
            <a href='https://velog.io/@kaitlin_k'>SOHYEON KIM</a>
          </li>
          <li>
            <a href='https://velog.io/@sssssssssy'>SEONYEONG MOON</a>
          </li>
          <li>
            <a href='https://velog.io/@limuubin'>YUBIN LIM</a>
          </li>
          <li>
            <a href='https://velog.io/@bbaa3218'>GWANGUI AN</a>
          </li>
        </ul>
        <div className='copyright'>Copyright Codeplay All rights reserved.</div>
      </div>
    </div>
  );
}

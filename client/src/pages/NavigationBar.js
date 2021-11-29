import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

export default function NavigationBar() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className='navBar-container'>
      <div className='bar'>
        <img alt='logo' src='img/logo.svg' className='home-logo' onClick={()=>{window.location.replace('/')}}/>
        <div className='btn-board'>
        <Link
              to='/board'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
          <span>메이트 탐색</span>
          </Link>
        </div>
        <div className='btn-search'>
        <Link
              to='/find-partner'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
          <span>메이트 모집</span>
          </Link>
        </div>
        {isLogin ? (
          <>
            <div className='btn-mypage'>
            <Link
              to='/mypage'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <span>마이페이지</span>
              </Link>
            </div>
            <div className='btn-logout'>
              <span>로그아웃</span>
            </div>
          </>
        ) : (
          <>
            <div className='btn-login'>
            <Link
              to='/login'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <span>로그인</span>
              </Link>
            </div>
            <div className='btn-signup'>
            <Link
              to='/signup'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <span>회원가입</span>
              </Link>
            </div>
          </>
        )}
        {isAdmin&&isLogin ? (
          <div className='btn-admin'>
            <Link
              to='/admin'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

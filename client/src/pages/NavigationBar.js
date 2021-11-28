import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

export default function NavigationBar() {
  return (
    <div className='navBar-container'>
      <Link to='/'> 홈 </Link>
      <Link to='/login'> 로그인 </Link>
      <Link to='/signup'> 회원가입 </Link>
      <Link to='/find-pw'> 비밀번호찾기 </Link>
      <Link to='/footer'> 푸터 </Link>
      <Link to='/board'> 게시판 </Link>
      <Link to='/find-partner'> 파트너찾기 </Link>
      <Link to='/view'> 뷰 </Link>
      <Link to='/mypage'> 마이페이지 </Link>
      <Link to='/admin'> 관리자페이지 </Link>
      <Link to='/modifyUserInfo'> 닉네임비번수정 </Link>

    </div>
  );
}

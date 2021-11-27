import React, { useState } from 'react';
import './MyPage.css';
import Mylog from '../components/MyPage/MyLog'
import ModifyUserInfo from '../components/MyPage/ModifyUserInfo'

export default function MyPage() {

  const [ tap, setTap ] = useState(0)

  return (
  <div className='mypage-container'>
    <div className="mypage-title">
        <img alt="logo" src="img/symbol.svg" />
        <div>마이 페이지</div>
      </div>
      <div className='mypage-tap'>
        <span onClick={()=>{setTap(false)}} className={!tap ? 'selected' : ''}>활동 로그</span>
        <span onClick={()=>{setTap(true)}} className={tap ? 'selected' : ''}>내 정보 수정</span>
      </div>
      <div className='box-pages'>
        {!tap ? <Mylog/> : <ModifyUserInfo/>}
      </div>
  </div>
  )
}

import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", pw: "" })
  const [failModal, setFailModal] = useState(false)
  const [modal, setModal] = useState(false)


  const valueChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const EnterLogin = (e) => {
    if (e.key === "Enter") {
    }
  }



  return (
    <>
      {modal === true
        ? (

          <div className="login-container">
            <div className="login-modal fadeIn">
              <div className='btn-loginClose' onClick={() => { setModal(false) }}></div>
              <div className="home-logo"></div>
              <div className="text-email">Email</div>
              <input className="input-email" name="email" onChange={valueChange} placeholder='Email' />
              <div className="text-pw">Password</div>
              <input className="input-pw" name="pw" type='password' onChange={valueChange} placeholder='Password' onKeyPress={EnterLogin} />
              <div className="text-falilogin" > 이메일 또는 비밀번호가 잘못 입력 되었습니다 </div>
              <button className="btn-login" onClick={() => { setFailModal(true) }}> 로그인 </button>
              {failModal === true
                ? <EmailVerification setFailModal={setFailModal} />
                : ""
              }
              <div className="grid-func">
                <div className="grid-signup"> 회원가입 </div>
                <div className="grid-naver">  네이버 </div>
                <div className="grid-kakao"> 카카오톡 </div>
                <div className="grid-findpw">  비밀번호 찾기 </div>
              </div>
            </div>
          </div>
        )
        : <button onClick={() => { setModal(true) }}>로그인</button>
      }
    </>
  );

}



function EmailVerification({ setFailModal }) {


  return (
    <div className="modal-container">
      <div className="box-modal">
        <div className="modal-message">입력하신 메일로<br />회원가입인증을 진행해주세요</div>
        <div>
          <span className="btn-close" onClick={() => { setFailModal(false) }}>확인</span>
        </div>
      </div>
    </div>)
}
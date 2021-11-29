import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", pw: "" })
  const [failModal, setFailModal] = useState(false)


  const valueChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const EnterLogin = (e) => {
    if (e.key === "Enter") {
    }
  }


  return (
    <div className="login-container">
      <div className="login-inner-contanier">
        <div className="home-logo"></div>
        <div className="inputEmail-text">Email</div>
        <div className="email-underbar"></div>
        <div><input className="input-UserInfo" name="email" onChange={valueChange} placeholder="이메일을 입력하세요" /></div>
        <div className="inputPw-text">Password</div>
        <div className="pw-underbar"></div>
        <div><input className="input-UserInfo" name="pw" onChange={valueChange} placeholder="비밀번호를 입력하세요" onKeyPress={EnterLogin} style={{ marginBottom: '20px' }} /></div>


        <div><button className="btn-login" onClick={() => { setFailModal(true) }}> 로그인 </button></div>

        {failModal === true
          ? <EmailVerification setFailModal={setFailModal} />
          : ""
        }
        <div className="fail-login" > 이메일 또는 비밀번호가 잘못 입력 되었습니다. </div>

        <div className="under-grid">
          <div className="grid-item"> 회원가입 </div>
          <div className="grid-item">  네이버 </div>
          <div className="grid-item"> 카카오톡 </div>
          <div className="grid-item">  비밀번호찾기 </div>
        </div>
      </div>
    </div>
  );

}



function EmailVerification({ setFailModal }) {


  return (
    <div className="modal-container">
      <div className="box-modal">
        <div className="modal-message">입력하신 메일로 <br /> 회원가입 인증을 진행 해주세요</div>
        <div>
          <span className="btn-close" onClick={() => { setFailModal(false) }}>확인</span>
        </div>
      </div>
    </div>)
}
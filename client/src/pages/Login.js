import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from "axios"
import KakaoLoginClickHandler from '../components/SignUp/Kakao';
import { useSelector, useDispatch } from 'react-redux';
import { loginModal } from '../actions';

export default function Login() {
  const dispatch = useDispatch();
  const { isModal } = useSelector((state) => state.loginModalReducer);

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })
  const [failModal, setFailModal] = useState(false)
  const [loginFail, setLoginFail] = useState(false)

  const valueChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const handleModal = () => {
    dispatch(loginModal(!isModal))
  }

  const EnterLogin = (e) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  const kakaoLoginHandler = async () => {
    await KakaoLoginClickHandler()
    await handleModal()
  }


  const handleLogin = async () => {
    const { email, password } = loginInfo
    await axios.post(`${process.env.REACT_APP_SERVER_API}/user/login`, { email, password },
      {
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 204) {
          /* 이메일 또는 비밀번호가 틀린경우 */
          setLoginFail(true)
        }
        else {
          /* 로그인 성공했을때 */
          handleModal()
          window.location.reload('/')

        }
      })
      .catch((err) => {
        console.log(err.response)
        if (err.response.status === 403) {
          /* 이메일인증안됨 */
          setLoginFail(false)
          setFailModal(true)

        }
      })
  }

  return (
    <>
      <div className="login-container">
        <div className="login-modal fadeIn">
          <div className='btn-loginClose' onClick={handleModal}></div>
          <div className="home-logo"></div>
          <div className="text-email">Email</div>
          <input className="input-email" name="email" onChange={valueChange} placeholder='Email' onKeyPress={EnterLogin} />
          <div className="text-pw">Password</div>
          <input className="input-pw" name="password" type='password' onChange={valueChange} placeholder='Password' onKeyPress={EnterLogin} />
          <div className={loginFail ? "text-falilogin" : 'hidden'} > 이메일 또는 비밀번호가 잘못 입력 되었습니다 </div>
          <button className="btn-login" onClick={handleLogin}> 로그인 </button>
          {failModal === true
            ? <EmailVerification setFailModal={setFailModal} />
            : ""
          }
          <div className="grid-func">
            <div className="grid-signup" onClick={handleModal}>
              <Link to='/signup' style={{ color: 'inherit', textDecoration: 'inherit' }}>회원가입</Link>
            </div>
            <div className="grid-kakao" onClick={kakaoLoginHandler} > </div>
            <div className="grid-naver">  네이버 </div>
            <div className="grid-findpw" onClick={handleModal}>
              <Link to='/find-pw' style={{ color: 'inherit', textDecoration: 'inherit' }}> 비밀번호 찾기 </Link>
            </div>
          </div>
        </div>
      </div >
    </>
  );

}



function EmailVerification({ setFailModal }) {


  return (
    <div className="modal-container">
      <div className="box-modal fadeIn">
        <div className="modal-message">입력하신 메일로 발송 된<br />회원가입 인증을 진행해주세요</div>
        <div>
          <span className="btn-close" onClick={() => { setFailModal(false) }}>확인</span>
        </div>
      </div>
    </div>)
}

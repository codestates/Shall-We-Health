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

  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'z6TA4to1zr3gBuIu2HMa',
      callbackUrl: 'http://localhost:3000/naver',
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'green', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

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
          <div className="input-back">
            <input className="input-email" autoComplete="on" name="email" onChange={valueChange} placeholder='Email' onKeyPress={EnterLogin} />
          </div>
          <div className="text-pw">Password</div>
          <div className="input-back">
            <input className="input-pw" name="password" type='password' onChange={valueChange} placeholder='Password' onKeyPress={EnterLogin} />
          </div>
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
            <div className="grid-naver" id='naverIdLogin'></div>
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

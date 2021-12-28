import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { verifyNickname, verifyEmail, verifyPassword } from '../utils/Verify';

export default function SignUp() {
  const [signUp, setSignUp] = useState(false);
  const [nicknameVaild, setNicknameValid] = useState(0)
  const [emailValid, setEmailValid] = useState(0)
  const [passwordValid, setPasswordValid] = useState(0)
  const [pwConfirmValid, setPwConfirmValid] = useState(0)
  const [inputInfo, setInputInfo] = useState({ nickname: '', email: '', password: '', pwConfirm: '', });
  const [checkMsg, setCheckMsg] = useState({ nickname: '', email: '', password: '', pwConfirm: '', signUp: '' });
  const [loading, setLoading] = useState(false);
  const { nickname, email, password, pwConfirm } = inputInfo;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputInfo({ ...inputInfo, [name]: value });
    setCheckMsg({ ...checkMsg, signUp: '' });
  };

  const handleNickname = () => {
    const nameCheck = verifyNickname(nickname);

    if (nickname !== '' && nameCheck) {
      setNicknameValid(1)
      setCheckMsg({ ...checkMsg, nickname: '' });
    } else if (nickname !== '' && !nameCheck) {
      setNicknameValid(0)
      setCheckMsg({ ...checkMsg, nickname: '닉네임 형식이 올바르지 않습니다' });
    }
  }


  const handleEmail = () => {
    const emailCheck = verifyEmail(email);

    if (email !== '' && emailCheck) {
      setEmailValid(1)
      setCheckMsg({ ...checkMsg, email: '' });
    } else if (email !== '' && !emailCheck) {
      setEmailValid(0)
      setCheckMsg({ ...checkMsg, email: '이메일 형식이 올바르지 않습니다' });
    }
  }



  const handlePassword = () => {
    const pwCheck = verifyPassword(password);
    if (password !== '' && !pwCheck) {
      setPasswordValid(0)
      setCheckMsg({ ...checkMsg, password: '숫자와 영문자 조합하여 8~15자리를 사용해야 합니다' });
    }
    else if (password !== '' && pwCheck) { // pw값이 비어있지않고 유효성이 통과했을 때 
      setPasswordValid(1)
      handlePwConfirm()
      setCheckMsg({ ...checkMsg, password: '사용 가능한 비밀번호입니다' });
    }

  }




  const handlePwConfirm = () => {

    if (pwConfirm !== password) {
      setPwConfirmValid(0)
      setCheckMsg({ ...checkMsg, pwConfirm: '비밀번호가 일치하지 않습니다' });
    } else if (password === pwConfirm && pwConfirm !== '') {
      setPwConfirmValid(1)
      setCheckMsg({ ...checkMsg, pwConfirm: '비밀번호가 일치합니다' })
    }

  }


  const UserInfoConfirm = async (e) => {
    const { name } = e.target;

    if (name === 'nickname') {
      if (nicknameVaild === 1) {
        await axios.get(`${process.env.REACT_APP_SERVER_API}/user/duplication`, {
          params: { nickname, email },
        })
          .then((res) => {
            if (res.data.data === false) {
              setNicknameValid(true);
              setCheckMsg({ ...checkMsg, nickname: '사용 가능한 닉네임입니다' });

            } else {
              setNicknameValid(0);
              setCheckMsg({ ...checkMsg, nickname: '사용 중인 닉네임입니다' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }


    if (name === 'email') {
      if (emailValid === 1) {
        await axios
          .get(`${process.env.REACT_APP_SERVER_API}/user/duplication`, {
            params: { nickname, email },
          })
          .then((res) => {
            if (res.data.data === false) {
              setEmailValid(true);
              setCheckMsg({ ...checkMsg, [name]: '사용 가능한 이메일입니다' });
            } else {
              setEmailValid(0);
              setCheckMsg({ ...checkMsg, [name]: '가입된 이메일입니다' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (name === 'signUp') {
      if (nicknameVaild === true && emailValid === true && passwordValid && pwConfirmValid) {
        setLoading(true);
        const { nickname, email, password } = inputInfo;
        await axios
          .post(`${process.env.REACT_APP_SERVER_API}/user/signup`, {
            nickname,
            email,
            password,
          })
          .then(() => {
            axios.post(`${process.env.REACT_APP_SERVER_API}/user/signup-verification`, { email })
              .then(async (res) => {
                await setLoading(false);
                await setSignUp(true);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setCheckMsg({
          ...checkMsg,
          [name]: '입력하신 내용을 확인해주세요',
        });
      }
    }
  };


  useEffect(() => {
    handleNickname();
  }, [inputInfo.nickname]);

  useEffect(() => {
    handleEmail();
  }, [inputInfo.email]);

  useEffect(() => {
    handlePassword();
  }, [inputInfo.password]);


  useEffect(() => {
    handlePwConfirm();
  }, [inputInfo.pwConfirm]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className='signup-container'>
      <div className='home-logo'></div>
      {loading === true ? (
        <div className='loading-container'>
          <img alt='loading' src='img/loading.svg' />
        </div>
      ) : signUp === true ? (
        <div>
          <div className='emailimg'></div>
          <div className='text-sentMail'>
            입력하신 이메일로 <br /> 가입메일이 발송 되었습니다.
          </div>
        </div>
      ) : (
        <div className='signup-box'>
          <div className='text'>닉네임</div>
          <div className='line'>
            <input name='nickname' autoComplete='off' onChange={handleInputChange} placeholder='특수문자 제외 2~10자내로 입력해주세요(공백가능)' />
            <button
              name='nickname'
              className='btn-confirm'
              onClick={(e) => { UserInfoConfirm(e); }}
            > 중복확인 </button>
          </div>
          <div className={nicknameVaild ? 'message check ' : 'message err'}>
            {checkMsg.nickname}
          </div>

          <div className='text'>이메일</div>
          <div className='line'>
            <input name='email' onChange={handleInputChange} placeholder='입력하신 메일로 가입인증메일이 전송됩니다' />
            <button
              name='email'
              className='btn-confirm'
              onClick={(e) => {
                UserInfoConfirm(e);
              }}
            >
              중복확인
            </button>
          </div>
          <div className={emailValid ? 'message check' : 'message err'}>
            {checkMsg.email}
          </div>

          <div className='text'>비밀번호</div>
          <div className='line'>
            <input
              name='password'
              type='password'
              onChange={handleInputChange}
              placeholder=' 영문+숫자 조합 8~15자리를 사용합니다'
            />
          </div>
          <div className={passwordValid ? 'message check' : 'message err'}>{checkMsg.password}</div>

          <div className='text'> 비밀번호 확인</div>
          <div className='line'>

            <input
              name='pwConfirm'
              type='password'
              onChange={handleInputChange}
              placeholder=' 비밀번호 재입력'
            />
          </div>
          {pwConfirm === '' ? <div className='message check'></div> : (pwConfirmValid ? <div className='message check'>비밀번호가 일치합니다</div> : <div className='message err'>비밀번호가 일치하지 않습니다</div>)}          <div className='message err center'>{checkMsg.signUp}</div>
          <button
            name='signUp'
            className='btn-signup'
            onClick={(e) => {
              UserInfoConfirm(e);
            }}
          >
            회원가입
          </button>
        </div>
      )
      }
    </div >
  );
}

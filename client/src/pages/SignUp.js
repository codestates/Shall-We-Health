import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from "axios"
import { verifyNickname, verifyEmail, verifyPassword } from '../utils/Verify'

export default function SignUp() {
  const [signUp, setSignUp] = useState(false)
  const [inputInfo, setInputInfo] = useState({ nickname: '', email: '', password: '', pwConfirm: '' })
  const [isValid, setIsValid] = useState({ nickname: 0, email: 0, password: 0, pwConfirm: 0 })
  const [checkMsg, setCheckMsg] = useState({ nickname: '', email: '', password: '', pwConfirm: '', signUp: '' })
  const [loading, setLoading] = useState(false)

  console.log(isValid)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputInfo({ ...inputInfo, [name]: value });
    setCheckMsg({ ...checkMsg, signUp: '' })
  };


  const isValidCkecked = async () => {
    const { nickname, email, password, pwConfirm } = inputInfo
    const nickVerify = verifyNickname(nickname)
    const emailVal = verifyEmail(email)
    const passwordVal = verifyPassword(password)

    if (!nickVerify && nickname !== '') {
      await setCheckMsg({ ...checkMsg, nickname: '닉네임 형식이 올바르지 않습니다' })
      await setIsValid({ ...isValid, nickname: 0 })
    } else if (nickVerify && nickname && isValid.nickname === 0) {
      await setCheckMsg({ ...checkMsg, nickname: '' })
      await setIsValid({ ...isValid, nickname: 1 })
    }

    if (!emailVal && email !== '') {
      await setCheckMsg({ ...checkMsg, email: '이메일 형식이 올바르지 않습니다' })
      await setIsValid({ ...isValid, email: 0 })
    } else if (emailVal && email && isValid.email === 0) {
      await setCheckMsg({ ...checkMsg, email: '' })
      await setIsValid({ ...isValid, email: 1 })
    }

    if (!passwordVal && password !== '') {
      setCheckMsg({ ...checkMsg, password: '숫자와 영문자 조합하여 8~15자리를 사용해야 합니다' })
      setIsValid({ ...isValid, password: 0 })
    } else if (passwordVal && password && isValid.password === 0) {
      setCheckMsg({ ...checkMsg, password: '' })
      setIsValid({ ...isValid, password: passwordVal })
    }


    if (pwConfirm !== password && pwConfirm !== '') {
      setIsValid({ ...isValid, pwConfirm: 0 })
      setCheckMsg({ ...checkMsg, pwConfirm: '비밀번호가 일치하지 않습니다' })
    } else if (pwConfirm === password && pwConfirm && isValid.pwConfirm === 0) {
      setIsValid({ ...isValid, pwConfirm: true })
      setCheckMsg({ ...checkMsg, pwConfirm: '' })
    }
  }


  const UserInfoConfirm = async (e) => {
    const { name } = e.target;
    const { nickname, email } = inputInfo

    if (name === 'nickname') {
      if (isValid.nickname === 1) {
        await axios.get(`${process.env.REACT_APP_SERVER_API}/user/duplication`, { params: { nickname, email } })
          .then((res) => {
            if (res.data.data === false) {
              setIsValid({ ...isValid, [name]: true })
              setCheckMsg({ ...checkMsg, [name]: '사용가능한 닉네임입니다' })
            } else {
              setIsValid({ ...isValid, [name]: 0 })
              setCheckMsg({ ...checkMsg, [name]: '사용중인 닉네임입니다' })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }

    if (name === 'email') {
      if (isValid.email === 1) {
        await axios.get(`${process.env.REACT_APP_SERVER_API}/user/duplication`, { params: { nickname, email } })
          .then((res) => {
            if (res.data.data === false) {
              setIsValid({ ...isValid, [name]: true })
              setCheckMsg({ ...checkMsg, [name]: '사용가능한 이메일입니다' })
            }
            else {
              setIsValid({ ...isValid, [name]: 0 })
              setCheckMsg({ ...checkMsg, [name]: '가입 된 이메일입니다' })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }


    if (name === 'signUp') {
      const { nickname, email, password, pwConfirm } = isValid

      if (nickname === true && email === true && password && pwConfirm) {
        setLoading(true)
        /*모든 조건이 true일때 회원가입가능*/
        const { nickname, email, password } = inputInfo
        await axios.post(`${process.env.REACT_APP_SERVER_API}/user/signup`, {

          /* 회원가입 DB저장*/
          nickname, email, password
        })
          .then(() => {
            axios.post(`${process.env.REACT_APP_SERVER_API}/user/signup-verification`, { email })
              /* 회원가입 DB저장되어 있는 이메일확인 후 메일보내주기*/
              .then(async (res) => {
                console.log(res)
                await setLoading(false)
                await setSignUp(true)
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        setCheckMsg({ ...checkMsg, [name]: '위에 내용 중 빠진부분이 없는지 확인해주세요' })
      }
    }
  }

  useEffect(() => {
    isValidCkecked()
  }, [inputInfo])


  return (

    <div className='signup-container'>
      <div className='home-logo'></div>
      {loading === true
        ? (
          <div className='loading-container'>
            <img alt='loading' src='img/loading.svg' />
          </div>
        )
        : (signUp === true
          ? (
            <div>
              <div className='text-sentMail'> 입력하신 이메일로 <br /> 가입메일이 발송 되었습니다. </div>
            </div>)
          : (
            <div className='signup-box'>
              <div className='text'>닉네임</div>
              <div>
                <input name='nickname' onChange={handleInputChange} placeholder='특수문자 제외 2~10자내로 입력해주세요(공백가능)' />
                <button name='nickname' className='btn-confirm' onClick={(e) => { UserInfoConfirm(e) }} >중복확인</button>
              </div>
              <div className={isValid.nickname ? 'message check ' : 'message err'}>{checkMsg.nickname} </div>


              <div className='text'>이메일</div>
              <div>
                <input name='email' onChange={handleInputChange} placeholder=' example@health.com' />
                <button name='email' className='btn-confirm' onClick={(e) => { UserInfoConfirm(e) }}>중복확인</button>
              </div>
              <div className={isValid.email ? 'message check' : 'message err'}>{checkMsg.email}</div>


              <div className='text'>비밀번호</div>
              <input name='password' type='password' onChange={handleInputChange} placeholder=' 영문+숫자 조합 8~15자리를 사용합니다' />
              <div className='message err' >{checkMsg.password}</div>

              <div className='text'> 비밀번호 확인</div>
              <input name='pwConfirm' type='password' onChange={handleInputChange} placeholder=' 비밀번호 재입력' />
              <div className='message err' >{checkMsg.pwConfirm}</div>

              <div className='message err center' >{checkMsg.signUp}</div>
              <button name='signUp' className='btn-signup' onClick={(e) => { UserInfoConfirm(e) }}>회원가입</button>
            </div>
          )
        )
      }


    </div>
  )
}

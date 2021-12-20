import React, { useEffect, useState } from 'react';
import './UpdatePw.css'
import { verifyPassword } from '../../utils/Verify'
import axios from "axios"

export default function UpdatePw({ match }) {
  const { token } = match.params
  const [inputPw, setInputPw] = useState({ password: '', pwConfirm: '' })
  const [pwVerify, setPwVerify] = useState(false)
  const [pwConfirmVerify, setpwConfirmVerify] = useState(false)
  const [completed, setCompleted] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputPw({ ...inputPw, [name]: value });
  };

  const isValidCkecked = () => {
    const { password, pwConfirm } = inputPw
    setPwVerify(verifyPassword(password))

    if (pwConfirm !== password && pwConfirm !== '') {
      setpwConfirmVerify(false)
    } else if (pwConfirm === password && pwConfirm) {
      setpwConfirmVerify(true)
    }
  }


  const passwordChange = async () => {
    const { password } = inputPw

    if (pwVerify && pwConfirmVerify) {
      await axios.patch(`${process.env.REACT_APP_SERVER_API}/user/password-verification`, { token, password })
        .then(() => {
          setCompleted(1)
          window.location.replace('/')
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setCompleted(-1)
          }
        })
    }
  }


  useEffect(() => {
    isValidCkecked()
  }, [inputPw])


  return (
    <>
      {completed === 1
        ? (
          <div className='updatepw-container'>
            <div className='home-logo'></div>
            <div className='checkimg'></div>
            <div className='text-completed'> 비밀번호 변경이 완료되었습니다</div>
          </div>
        )
        : (completed === -1
          ? (

            <div className='updatepw-container'>
              <div className='home-logo'></div>
              <div className='failimg'></div>
              <div className='text-completed' style={{ color: '#e94242' }}>   올바르지 않은 접근입니다</div>
            </div>
          )
          : (<div className='updatepw-container'>
            <div className='home-logo'></div>
            <div className='inner-container'>

              <div className='text-title' > 비밀번호 변경 </div>
              <div className='text-pw' >비밀번호</div>
              <input className='input-pw' type='password' onChange={handleInputChange} name='password' placeholder='비밀번호를 입력하세요' />
              <div className={pwVerify ? 'hidden' : 'err'}>숫자와 영문자 조합하여 10~15자리를 사용해야 합니다</div>

              <div className='text-dubble-pw' >비밀번호 확인</div>
              <input className='input-dubble-pw' type='password' onChange={handleInputChange} name='pwConfirm' placeholder='비밀번호를 한번 더  입력하세요' />

              <div className={pwConfirmVerify ? 'hidden' : 'err'}>비밀번호가 일치하지 않습니다</div>
              <button className='btn-modifyPw' onClick={passwordChange}>비밀번호 변경</button>
            </div>
          </div>
          )
        )
      }
    </>
  )
}
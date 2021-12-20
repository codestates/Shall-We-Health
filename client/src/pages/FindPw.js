import React, { useState } from 'react';
import './FindPw.css';
import axios from "axios"

export default function FindPw() {
  const [email, setEmail] = useState('')
  const [isSend, setIsSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verify, setVerify] = useState(true)


  const valueChange = (e) => {
    setEmail(e.target.value);
  }

  const emailCheck = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_API}/user/duplication`, { params: { nickname: '', email } })
      .then((res) => {
        if (res.data.data === false) {
          setVerify(false)
        }
        else {
          setVerify(true)
          setLoading(true)
          axios.post(`${process.env.REACT_APP_SERVER_API}/user/findpw-verification`, { email })
            .then(async (res) => {
              await setLoading(false)
              await setIsSend(true)
            })
            .catch((err) => {
              console.log(err)
            })
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (

    <div className='findpw-container'>
      <div className='home-logo'></div>
      {loading === true
        ? (
          <div className='loading-container'>
            <img alt='loading' src='img/loading.svg' />
          </div>
        ) : (
          <div className='inner-container'>

            {isSend === false
              ? (
                <>
                  <div className='text-findPw' > 비밀번호 찾기 </div>
                  <div className='text-email' >Email</div>
                  <input className='input-email' name='email' placeholder='이메일을 입력하세요' onChange={valueChange} />
                  <button className='btn-mailsend' onClick={emailCheck}>인증메일 발송</button>
                  <div className={verify ? 'hidden' : 'err'}>유효한 이메일이 아닙니다</div>
                </>
              )
              : (
                <>
                  <div className='text-sentMail'>
                    입력하신 이메일로 <br />
                    비밀번호 변경메일이 발송 되었습니다.
                  </div>
                  <button className='btn-home' onClick={() => { window.location.replace('/') }}>홈으로</button>
                </>
              )
            }
          </div>
        )}
    </div>

  )
}


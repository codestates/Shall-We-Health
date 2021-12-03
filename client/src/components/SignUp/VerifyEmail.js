import React, { useEffect, useState } from 'react';
import axios from "axios"
import './VerifyEmail.css'

export default function VerifyEmail({ match }) {
  const [completed, setCompleted] = useState(true)
  const { token } = match.params

  const signUpstateUpdate = async () => {
    await axios.patch(`${process.env.REACT_APP_SERVER_API}/user/email-verification`, { token })
      .then((res) => {
        console.log(res, 'client/verifyEmail')
        if (!res.data.data) {
          setCompleted(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    signUpstateUpdate()
  }, [])

  return (
    <div className='verifyemail-container'>
      <div className='home-logo'></div>
      {completed
        ? (
          <div>
            <div className='text-signUp'>  환영합니다!💪🏻 <br /> 회원가입이 완료 되었습니다<br /> 로그인 후 운동메이트를 찾아보세요</div>
          </div>
        )
        : (
          <div>
            <div className='text-signUp Fail'>  유효하지 않은 접근입니다.<br /> 확인 후 다시 접속해주세요.</div>
          </div>
        )
      }

    </div>
  )
}
import React, { useState } from 'react';
import './SignUp.css';

export default function SignUp() {
  const [signUp, setSignUp] = useState(false)
  const [data, setData] = useState({})

  return (

    <div className='signup-container'>
      <div className='home-logo'></div>
      {signUp === true
        ? (
          <div>
            <div className='text-sentMail'>
              입력하신 이메일로 <br />
              가입메일이 발송 되었습니다.
            </div>
          </div>)
        : (
          <div className='signup-box'>
            <div>
              <div className='text'>닉네임</div>
              <input name='nickname' />
              <div className='text-checkment'>사용중인 닉네임 입니다</div>
              {/* <div className='text-checkment'>사용가능한 닉네임 입니다</div> */}
              <div className='text'>이메일</div>
              <input name='email' />
              <div className='text-checkment'>가입된 이메일입니다</div>
              {/* <div className='text-checkment'>사용가능한 이메일입니다</div> */}
              <div className='text'>비밀번호</div>
              <input name='password' type='password' />
              <div className='ment'>숫자와 영문자 조합하여 10~15자리를 사용해야 합니다</div>
              <div className='text'> 비밀번호 확인</div>
              <input name='password-confirm' type='password' />
              <div className='ment'>비밀번호가 일치하지 않습니다</div>
              <button className='btn-signup' onClick={() => { setSignUp(true) }}>회원가입</button>
            </div>
            <div className='btn-box'>
              <button className='btn-confirm'>중복확인</button>
              <button className='btn-confirm'>중복확인</button>
            </div>
          </div>
        )
      }

    </div>
  )
}

import React, { useState } from 'react';
import './FindPw.css';

export default function FindPw() {
  const [email, setEmail] = useState('')
  const array = [<Findpwhome />, <PwFindMail />, <ModifyPw />]

  const valueChange = (e) => {
    setEmail(e.target.value);
  }


  return (

    <div className='findpw-container'>
      <div className='home-logo'></div>
      <div className='inner-container'>
        {/* {page === 1 */}
        {/* <Findpwhome email={email} valueChange={valueChange} /> */}
        {/* ? <PwChangeage /> */}
        {/* : <PwFindMail /> */}
        {/* } */}
        {array[2]}
      </div>
    </div>
  )
}





function Findpwhome({ email, valueChange }) {
  return (
    <>
      <div className='text-findPw' > 비밀번호 찾기 </div>
      <div className='text-email' >Email</div>
      <input className='input-email' name='email' value={email} placeholder='이메일을 입력하세요' onChange={valueChange} />
      <button className='btn-mailsend'>인증메일 발송</button>
      <div className='not-validemail'>유효한 이메일이 아닙니다</div>
    </>
  )
}


function PwFindMail() {
  return (
    <>
      <div className='text-sentMail'>
        입력하신 이메일로 <br />
        비밀번호 변경메일이 발송 되었습니다.
      </div>
      <button className='btn-home'>홈으로</button>
    </>
  )
}


function ModifyPw() {
  return (
    <>
      <div className='text-modifyPw' > 비밀번호 변경 </div>
      <div className='text-pw' >비밀번호</div>
      <input className='input-pw' type='password' name='pw' placeholder='비밀번호를 입력하세요' />
      <div className='text-wrong-pw'>숫자와 영문자 조합하여 10~15자리를 사용해야 합니다</div>


      <div className='text-dubble-pw' >비밀번호 확인</div>
      <input className='input-dubble-pw' type='password' name='dubble-pw' placeholder='비밀번호를 한번 더  입력하세요' />

      <div className='text-wrong-dubblePw'>비밀번호가 일치하지 않습니다</div>
      <button className='btn-modifyPw'>비밀번호 변경</button>

    </>

  )
}
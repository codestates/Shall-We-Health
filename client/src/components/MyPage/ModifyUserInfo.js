import React from 'react';
import './ModifyUserInfo.css'

export default function ModifyUserInfo() {
  return (
    <div className='modifyuserinfo-container'>
      <table>
        <tr>
          <td className='text'>닉네임</td>
        </tr>
        <tr>
          <td><input /></td>
          <td><button className='btn-nickname-confirm'>중복확인</button></td>
        </tr>
        <tr>
          <td className='text-wrong'>사용중인 닉네임 입니다</td>
        </tr>
        <tr>
          <td className='text'>새로운 비밀번호</td>
        </tr>
        <tr>
          <td><input /></td>
        </tr>
        <tr>
          <td className='text-wrong'>숫자와 영문자 조합하여 10~15자리를 사용해야 합니다</td>
        </tr>
        <tr>
          <td className='text'>비밀번호 확인</td>
        </tr>
        <tr>
          <td><input /></td>
        </tr>
        <tr>
          <td className='text-wrong'>비밀번호가 일치하지 않습니다</td>
        </tr>
        <tr>
          <td><button className='btn-modify'>수정하기</button></td>
        </tr>
        <tr>
          <td><button className='btn-quit'>회원탈퇴</button></td>
        </tr>
      </table>
    </div >
  )
}
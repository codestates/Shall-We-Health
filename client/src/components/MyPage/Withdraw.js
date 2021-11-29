import React from 'react';
import NewWindow from "react-new-window";
import './Withdraw.css'

export default function Withdraw() {
  return <NewWindow features={{ width: 500, height: 280 }} title="탈퇴하기">
      <div className="withdraw-container">
      <div className="box-withdraw">
        <div className="withdraw-title">
          탈퇴하기
        </div>
        <div className='withdraw-info'><span>유저 이메일 : </span><span>이메일</span></div>
        <div className='withdraw-script'>아래사항을 확인하시고 동의 후 탈퇴를 진행해주세요.</div>
        <ul className='withdraw-content'>
          <li>탈퇴 후, 계정 정보가 삭제되며, 모든 데이터는 복구가 불가능 합니다.</li>
        </ul>
        <div className='box-agree'>
        <input type='checkbox' id='withdrawal' className='match-check-box'/>
          <label for='match-withdrawal' className='text-agree'>위 사항을 확인했으며 탈퇴 진행에 동의합니다.</label>
        </div>
        <div className="box-withdraw-btn">
          <span id="btn-cancel">취소</span>
          <span id="btn-withdraw">탈퇴하기</span>
        </div>
      </div>
      </div>
    </NewWindow>
}

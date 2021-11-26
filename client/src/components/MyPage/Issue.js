import React from "react";
import NewWindow from "react-new-window";
import "./Issue.css";

export default function Issue() {
  return (
    <NewWindow features={{ width: 500, height: 350 }} title="신고하기">
      <div className="issue-container">
      <div className="box-issue">
        <div className="issue-title">
          신고하기
        </div>
        <div className='issue-info'><span>신고 대상 : </span><span>닉네임</span></div>
        <div className='issue-script'>신고 사유를 100자 내로 기재해주세요.</div>
        <textarea className='issue-content' />
        <div className="box-issue-btn">
          <span id="btn-cancel">취소</span>
          <span id="btn-issue">신고하기</span>
        </div>
      </div>
      </div>
    </NewWindow>
  );
}

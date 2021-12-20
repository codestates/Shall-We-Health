import React from "react";
import "./Confirm.css";

export default function Confirm() {
  return (
    <div className="confirm-container">
      <div className="box-confirm">
        <div className="confirm-message">
          확인 창 예시입니다!!
        </div>
        <div className="box-confirm-btn">
          <span id="btn-cancel">취소</span>
          <span id="btn-confirm">확인</span>
        </div>
      </div>
    </div>
  );
}

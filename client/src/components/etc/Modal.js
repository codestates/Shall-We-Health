import React from "react";
import "./Modal.css";

export default function Modal() {
  return (
    <div className="modal-container">
      <div className="box-modal">
        <div className="modal-message">모달 예시입니다!!</div>
        <div>
          <span>확인</span>
        </div>
      </div>
    </div>
  );
}

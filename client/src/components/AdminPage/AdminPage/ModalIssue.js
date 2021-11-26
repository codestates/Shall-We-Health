import React from 'react';
import './ModalIssue.css'

export default function ModalIssue({setModalIssue}) {
  return <div className='modalissue-container'>
      <div className="box-modal">
        <table className='table-info'>
          <tr>
          <th>신고자</th>
          <td>임유빈</td>
          </tr>
          <tr>
          <th>신고 대상</th>
          <td>김소현</td>
          </tr>
          <tr>
          <th>신고 날짜</th>
          <td>2021.11.24</td>
          </tr>
          <tr>
          <th>신고 내용</th>
          <td></td>
          </tr>
          
        </table>
        <div className="issue-content">노쇼 시전하셨습니다. 화가 납니다.</div>
        <div>
          <span onClick={()=>{setModalIssue(false)}}>닫기</span>
        </div>
      </div>
  </div>;
}
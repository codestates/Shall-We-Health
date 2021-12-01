import React from 'react';
import './ModalIssue.css'

export default function ModalIssue({setModalIssue, issueData}) {
  return <div className='modalissue-container'>
      <div className="box-modal">
        <table className='table-info'>
          <tr>
          <th>신고자</th>
          <td>{issueData.reporter}</td>
          </tr>
          <tr>
          <th>신고 대상</th>
          <td>{issueData.target}</td>
          </tr>
          <tr>
          <th>신고 날짜</th>
          <td>{issueData.createdAt.slice(0,10)}</td>
          </tr>
          <tr>
          <th>신고 내용</th>
          <td></td>
          </tr>
          
        </table>
        <div className="issue-content">{issueData.content}</div>
        <div>
          <span onClick={()=>{setModalIssue(false)}}>닫기</span>
        </div>
      </div>
  </div>;
}
import React, {useState} from "react";
import NewWindow from "react-new-window";
import axios from 'axios';
import "./Issue.css";
import useTheme from '../../hooks/useTheme';

export default function Issue({setIssue, issueInfo}) {

  const [theme] = useTheme();
  const [ content, SetContent ] = useState('')
  const [ modal, setModal ] = useState(false)
  const [ completModal, setCompleteModal ] = useState(false)

  const submitIssue = () => {
    if(content==='') {
      setModal(true)
    } else {
      axios.post(`${process.env.REACT_APP_SERVER_API}/mypage/issue`,{
        targetId: issueInfo.targetId,
        content,
        postId: issueInfo.postId
      }, {
        withCredentials: true
      })
      .then(()=>{
        setCompleteModal(true)
      })
    }
  }

  return (
    <NewWindow features={{ width: 500, height: 343 }} title="신고하기">
      <div className="issue-container" data-theme={theme}>
      <div className="box-issue">
        <div className="issue-title">
          신고하기
        </div>
        <div className='issue-info'><span>신고 대상 : </span><span>{issueInfo.targetNickname}</span></div>
        <div className='issue-script'>신고 사유를 200자 내로 기재해주세요.</div>
        <textarea className='issue-content' maxLength='200' onChange={(e)=>{SetContent(e.target.value)}}/>
        <div className="box-issue-btn">
          <span id="btn-cancel" onClick={()=>{setIssue(false)}}>취소</span>
          <span id="btn-issue" onClick={submitIssue}>신고하기</span>
        </div>
      </div>
      </div>
      {modal?<Modal data-theme={theme} setModal={setModal}/> : ''}
      {completModal?<CompleteModal data-theme={theme} setCompleteModal={setCompleteModal} setIssue={setIssue}/> : ''}
    </NewWindow>
  );
}

function Modal({setModal}) {

  const [theme] = useTheme();

  return (
    <div className="issuealert-container" data-theme={theme}>
    <div className="box-modal">
      <div className="modal-message">신고사유를 입력해주세요.</div>
      <div>
        <span onClick={()=>{setModal(false)}}>확인</span>
      </div>
    </div>
  </div>
  )
}

function CompleteModal({setIssue, setCompleteModal}) {

  const [theme] = useTheme();

  return (
    <div className="issuealert-container" data-theme={theme}>
    <div className="box-modal">
      <div className="modal-message">신고가 완료되었습니다.</div>
      <div>
        <span onClick={()=>{
          setCompleteModal(false)
          setIssue(false)}
          }>확인</span>
      </div>
    </div>
  </div>
  )
}

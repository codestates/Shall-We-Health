import React, { useState }from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NewWindow from "react-new-window";
import './Withdraw.css'
import useTheme from '../../hooks/useTheme';

export default function Withdraw({setWithdrawModal}) {

  const [theme] = useTheme();
  const { email } = useSelector((state) => state.loginReducer);
  const [ isChecked, setIsCheck ] = useState(false)
  const [ modal, setModal] = useState(false)
  const [ modalMsg, setModalMsg ] = useState('')

  const submitWithdraw = () => {
    axios.delete(`${process.env.REACT_APP_SERVER_API}/users/withdrawal`, {
      withCredentials: true,
    })
    .then(()=> {
      setModalMsg('탈퇴가 완료되었습니다.')
      setModal(true)
    })
    .catch(()=>{
      setModalMsg('잘못된 접근입니다.')
      setModal(true)
    })
  }
  

  return <NewWindow features={{ width: 500, height: 280 }} title="탈퇴하기">
      <div className="withdraw-container" data-theme={theme}>
      <div className="box-withdraw">
        <div className="withdraw-title">
          탈퇴하기
        </div>
        <div className='withdraw-info'><span>유저 이메일 : </span><span>{email}</span></div>
        <div className='withdraw-script'>아래사항을 확인하시고 동의 후 탈퇴를 진행해주세요.</div>
        <ul className='withdraw-content'>
          <li>탈퇴 후, 계정 정보가 삭제되며, 모든 데이터는 복구가 불가능 합니다.</li>
        </ul>
        <div className='box-agree'>
        <input type='checkbox' id='match-withdrawal' className='match-check-box' checked={isChecked} onChange={(e)=> {setIsCheck(e.target.checked)}}/>
          <label for='match-withdrawal' className='text-agree'>위 사항을 확인했으며 탈퇴 진행에 동의합니다.</label>
        </div>
        <div className="box-withdraw-btn">
          <span id="btn-cancel" onClick={()=>{setWithdrawModal(false)}}>취소</span>
          {isChecked ? <span id="btn-withdraw" onClick={submitWithdraw}>탈퇴하기</span> : <span id="btn-withdraw-inactive">탈퇴하기</span>}
        </div>
      </div>
      {modal? <Modal setWithdrawModal={setWithdrawModal} setModal={setModal} modalMsg={modalMsg}/> :''}
      </div>
    </NewWindow>
}

function Modal({setWithdrawModal, setModal, modalMsg}) {

  const [theme] = useTheme();
  
  return (
    <div className="modalwithdraw-container" data-theme={theme}>
    <div className="box-modal">
      <div className="modal-message">{modalMsg}</div>
      <div>
        <span onClick={()=>{
          setModal(false)
          setWithdrawModal(false)
          window.location.replace('/')
        }}>확인</span>
      </div>
    </div>
  </div>
  )
}

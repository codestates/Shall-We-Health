import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./AdminPage.css";
import AdminMatch from '../components/AdminPage/AdminMath'
import AdminUser from '../components/AdminPage/AdminUser'
import AdminIssue from '../components/AdminPage/AdminIssue'

export default function AdminPage() {

  const [ tap, setTap ] = useState(0)
  const [modal, setModal] = useState(false)

  const checkisAdmin = () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
      withCredentials: true,
    })
    .then((res) =>{
      if(!res.data.data.decoded.isAdmin) {
        setModal(true)
      }
    })
    .catch(()=>{
      setModal(true)
    })
  }

  useEffect(()=>{
    checkisAdmin();
  },[])

  return (
    <div className="adminpage-container">
      {modal? <Modal/> : (
        <>
      <div className="admin-title">
        <img alt="logo" src="img/symbol.svg" />
        <div>관리자 페이지</div>
      </div>
      <div className='admin-tap'>
        <span onClick={()=>{setTap(0)}} className={tap===0 ? 'selected' : ''}>매칭 관리</span>
        <span onClick={()=>{setTap(1)}} className={tap===1 ? 'selected' : ''}>유저 관리</span>
        <span onClick={()=>{setTap(2)}} className={tap===2 ? 'selected' : ''}>신고 내역</span>
      </div>
      <div className='box-pages'>
        {tap===0 ? <AdminMatch/> :(
          tap===1 ? <AdminUser/> : <AdminIssue/>
        )}
      </div>
      </>
      )}
    </div>
  );
}

function Modal({setModal}) {
  return (
    <div className="issuealert-container">
    <div className="box-modal">
      <div className="modal-message">관리자만 접근할 수 있습니다.</div>
      <div>
        <span onClick={()=>{window.location.replace('/')}}>확인</span>
      </div>
    </div>
  </div>
  )
}

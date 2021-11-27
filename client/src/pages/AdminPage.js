import React, { useState } from "react";
import "./AdminPage.css";
import AdminMatch from '../components/AdminPage/AdminMath'
import AdminUser from '../components/AdminPage/AdminUser'
import AdminIssue from '../components/AdminPage/AdminIssue'

export default function AdminPage() {

  const [ tap, setTap ] = useState(0)

  return (
    <div className="adminpage-container">
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
    </div>
  );
}

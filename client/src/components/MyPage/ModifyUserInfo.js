import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Withdraw from './Withdraw';
import { verifyNickname, verifyPassword } from '../../utils/Verify';
import axios from 'axios';
import './ModifyUserInfo.css';

export default function ModifyUserInfo() {
  const { email, nickname, isOauth } = useSelector((state) => state.loginReducer);
  const [nicknameForm, setNicknameForm] = useState(nickname);
  const [checkNickname, setCheckNickname] = useState(0);
  const [pwd, setPwd] = useState('');
  const [checkpwd, setCheckpwd] = useState(0);
  const [pwd2, setPwd2] = useState('');
  const [checkpwd2, setCheckpwd2] = useState(0);
  const [ modal, setModal ] = useState(false)
  const [ modalMsg, setModalMsg ] = useState('')
  const [ completeModal, setCompleteModal ] = useState(false)
  const [ withdrawModal, setWithdrawModal ] = useState(false)

  const handleNickname = (e) => {
    if (e.target.value === nickname) {
      setNicknameForm(nickname);
      setCheckNickname(0);
    } else {
      setNicknameForm(e.target.value);
      if (!verifyNickname(e.target.value)) {
        setCheckNickname(2);
      }
      if (verifyNickname(e.target.value)) {
        setCheckNickname(0);
      }
    }
  };

  const duplication = () => {
    if (nickname === nicknameForm) {
      setModal(true)
      setModalMsg('현재 사용중인 닉네임입니다.');
    } else if (checkNickname === 2) {
      setModal(true)
      setModalMsg('사용 불가능한 닉네임입니다.');
    } else {
      axios.get(`${process.env.REACT_APP_SERVER_API}/user/duplication`, {
        params: { email: '', nickname: nicknameForm },
      })
      .then((res) => {
        if(res.data.data){
          setCheckNickname(3)
        } else if (!res.data.data) {
          setCheckNickname(1)
        }
      })
    }
  };

  const handleCheckPwd = () => {
    if (pwd === '') {
      setCheckpwd(0);
    } else if (verifyPassword(pwd)) {
      setCheckpwd(1);
    } else {
      setCheckpwd(2);
    }
  };

  const handleCheckPwd2 = () => {
    if (pwd2 === '') {
      setCheckpwd2(0);
    } else if (pwd === pwd2) {
      setCheckpwd2(1);
    } else {
      setCheckpwd2(2);
    }
  };

  const submitInfo = () => {
    if(nicknameForm === nickname && checkpwd===0 && checkpwd2===0){
      setModal(true)
      setModalMsg('변경사항이 없습니다.');
    }else if (
      checkNickname === 2 ||
      checkNickname === 3 ||
      (checkNickname === 0 && nicknameForm !== nickname)
    ) {
      setModal(true)
      setModalMsg('유효하지 않는 닉네임입니다.');
    }
    else if (checkpwd===2 || checkpwd2 ===2){
      setModal(true)
      setModalMsg('입력한 비밀번호를 확인해주세요');
    } else if(checkNickname===1 && checkpwd===1) {
      axios.patch(`${process.env.REACT_APP_SERVER_API}/user/info`, {
        email,
        nickname: nicknameForm,
        newPassword: pwd
      })
      .then((res) => {
        setCompleteModal(true)
      })
    } else if (checkNickname===1 && checkpwd!==1) {
      axios.patch(`${process.env.REACT_APP_SERVER_API}/user/info`, {
        email,
        nickname: nicknameForm
      })
      .then((res) => {
        setCompleteModal(true)
      })
    } else {
      axios.patch(`${process.env.REACT_APP_SERVER_API}/user/info`, {
        email,
        newPassword: pwd
      })
      .then((res) => {
        setCompleteModal(true)
      })
    }
  };

  useEffect(() => {
    handleCheckPwd2();
  }, [pwd, pwd2]);

  useEffect(() => {
    handleCheckPwd();
  }, [pwd]);

  return (
    <div className='modifyuserinfo-container'>
      <table>
        <tr>
          <td className='text'>닉네임</td>
        </tr>
        <tr>
          <td>
            <input
              value={nicknameForm}
              onChange={handleNickname}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setNicknameForm(nickname);
                  setCheckNickname(0);
                }
              }}
            />
          </td>
          <td>
            <button className='btn-nickname-confirm' onClick={duplication}>
              중복확인
            </button>
          </td>
        </tr>
        <tr>
          {checkNickname === 0 ? (
            <td className='text-right hidden'>사용 가능한 닉네임 입니다</td>
          ) : checkNickname === 1 ? (
            <td className='text-right'>사용 가능한 닉네임 입니다</td>
          ) : checkNickname === 2 ? (
            <td className='text-wrong'>사용 불가능한 닉네임 입니다</td>
          ) : (
            <td className='text-wrong'>사용중인 닉네임 입니다</td>
          )}
        </tr>
        {isOauth ? (
          <>
        <tr>
          <td className='text'>새로운 비밀번호</td>
        </tr>
        <tr>
          <td>
            <input
              type='password'
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          {checkpwd === 0 ? (
            <td className='text-right hidden'>사용 가능한 비밀번호 입니다</td>
          ) : checkpwd === 1 ? (
            <td className='text-right'>사용 가능한 비밀번호 입니다</td>
          ) : (
            <td className='text-wrong'>
              숫자와 영문자 조합하여 10~15자리를 사용해야 합니다
            </td>
          )}
        </tr>
        <tr>
          <td className='text'>비밀번호 확인</td>
        </tr>
        <tr>
          <td>
            <input
              type='password'
              onChange={(e) => {
                setPwd2(e.target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          {checkpwd2 === 0 ? (
            <td className='text-right hidden'>비밀번호가 일치합니다</td>
          ) : checkpwd2 === 1 ? (
            <td className='text-right'>비밀번호가 일치합니다</td>
          ) : (
            <td className='text-wrong'>비밀번호가 일치하지 않습니다</td>
          )}
        </tr>
        </>
        ) : ''}
        <tr>
          <td>
            <button className='btn-modify' onClick={submitInfo}>수정하기</button>
          </td>
        </tr>
        <tr>
          <td>
            <button className='btn-quit' onClick={ async()=>{
              await setWithdrawModal(false)
              await setWithdrawModal(true)
            }}>회원탈퇴</button>
          </td>
        </tr>
      </table>
      {modal ? <ErrorModal setModal={setModal} modalMsg={modalMsg}/> : ''}
      {completeModal ? <CompleteModal setCompleteModal={setCompleteModal}/> : ''}
      {withdrawModal ? <Withdraw setWithdrawModal={setWithdrawModal}/> : ''}
    </div>
  );
}

function ErrorModal({ setModal, modalMsg }) {
  return (
    <div className='modalmodify-container'>
      <div className='box-modal'>
        <div className='modal-message'>{modalMsg}</div>
        <div>
          <span
            onClick={() => {
              setModal(false);
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

function CompleteModal({ setCompleteModal }) {
  return (
    <div className='modalmodify-container'>
      <div className='box-modal'>
        <div className='modal-message'>수정이 완료되었습니다.</div>
        <div>
          <span
            onClick={() => {
              setCompleteModal(false);
              window.location.reload();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

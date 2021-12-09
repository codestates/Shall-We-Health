import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../etc/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';

export default function AdminUser() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleKeyword = (e) => {
    if (e.target.value === '') {
      setKeyword(null);
    } else {
      setKeyword(e.target.value);
    }
  };

  const getUserData = async () => {
    await setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/user-list`, {
        params: { page, keyword },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
    await setIsLoading(false);
  };


  const getSearchData = async () => {
    await setIsLoading(true);
    await setPage(1);
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/user-list`, {
        params: { page, keyword },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
    await setIsLoading(false);
  };

  const getUserDataPage = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/user-list`, {
        params: { page, keyword },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
  };

  const deleteUser = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_API}/admin`, {
        data: { userId: deleteId },
        withCredentials: true,
      })
      .then((res) => {
        setModal(true);
      })
      .catch((res) => {
        setErrorModal(true);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserDataPage();
  }, [page]);

  return (
    <div className='adminuser-container'>
      <div className='box-search'>
        <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='닉네임 또는 이메일'
            onChange={handleKeyword}
            onKeyPress={(e)=>{
              if(e.key==='Enter') {
                getSearchData();
              }
            }}
          ></input>
          <span>
            <button
              id='searchButton'
              onClick={() => {
                getSearchData();
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
        </div>
      </div>
      <table className='table-data'>
        <th className='email'>이메일</th>
        <th className='nickname'>닉네임</th>
        <th className='hostNum'>모집횟수</th>
        <th className='guestNum'>매칭횟수</th>
        <th className='delete'></th>
        {isLoading ? (
          <tr className='box-loading'>
            <td colSpan='5'>
              <Loading />
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr className='box-none'>
            <td colSpan='5'>일치하는 데이터가 없습니다.</td>
          </tr>
        ) : (
          data.map((el, i) => {
            return (
              <DataRow
                setConfirm={setConfirm}
                setDeleteId={setDeleteId}
                el={el}
                key={i}
              />
            );
          })
        )}
      </table>
      <div className='box-paging'>
        <Pagination
          activePage={page}
          itemsCountPerPage={7}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={setPage}
        />
      </div>
      {confirm ? (
        <ConfirmUser
          setConfirm={setConfirm}
          setDeleteId={setDeleteId}
          deleteUser={deleteUser}
        />
      ) : (
        ''
      )}
      {modal ? (
        <ModalUser
          setModal={setModal}
          setDeleteId={setDeleteId}
          getUserData={getUserData}
        />
      ) : (
        ''
      )}
      {errorModal ? (
        <ErrorModal setErrorModal={setErrorModal} setDeleteId={setDeleteId} />
      ) : (
        ''
      )}
    </div>
  );
}

const DataRow = ({ el, setConfirm, setDeleteId }) => {
  return (
    <tr>
      <td>{el.email}</td>
      <td>{el.nickname}</td>
      <td>{el.hostNum}</td>
      <td>{el.guestNum}</td>
      <td>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className='btn-delete'
          onClick={() => {
            setConfirm(true);
            setDeleteId(el.id);
          }}
        />
      </td>
    </tr>
  );
};

function ConfirmUser({ setConfirm, setDeleteId, deleteUser }) {
  return (
    <div className='confirmuser-container'>
      <div className='box-confirm'>
        <div className='confirm-message'>해당 유저를 삭제하시겠습니까?</div>
        <div className='box-confirm-btn'>
          <span
            id='btn-cancel'
            onClick={() => {
              setConfirm(false);
              setDeleteId(null);
            }}
          >
            취소
          </span>
          <span
            id='btn-confirm'
            onClick={async () => {
              await setConfirm(false);
              await deleteUser();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

function ModalUser({ setModal, setDeleteId, getUserData }) {
  return (
    <div className='modaluser-container'>
      <div className='box-modal'>
        <div className='modal-message'>삭제되었습니다.</div>
        <div>
          <span
            onClick={() => {
              setModal(false);
              setDeleteId(null);
              getUserData();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({ setErrorModal, setDeleteId }) {
  return (
    <div className='modaluser-container'>
      <div className='box-modal'>
        <div className='modal-message'>잘못된 접근입니다.</div>
        <div>
          <span
            onClick={() => {
              setErrorModal(false);
              setDeleteId(null);
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

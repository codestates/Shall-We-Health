import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../etc/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';

export default function AdminMatch() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleNickname = (e) => {
    if (e.target.value === '') {
      setNickname(null);
    } else {
      setNickname(e.target.value);
    }
  };

  const getMatchData = async () => {
    await setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/post-list`, {
        params: { page, nickname },
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
      .get(`${process.env.REACT_APP_SERVER_API}/admin/post-list`, {
        params: { page, nickname },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
    await setIsLoading(false);
  };

  const getMatchDataPage = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/post-list`, {
        params: { page, nickname },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
  };

  const deleteMatch = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_API}/admin`, {
        data: { postId: deleteId },
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
    getMatchData();
  }, []);

  useEffect(() => {
    getMatchDataPage();
  }, [page]);

  return (
    <div className='adminmatch-container'>
      <div className='box-search'>
        <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='?????????'
            onChange={handleNickname}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
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
      <div className='box-table'>
      <table className='table-data'>
        <th className='date'>??????</th>
        <th className='location'>??????</th>
        <th className='target'>??????/?????? ??????</th>
        <th className='match'>????????????</th>
        <th className='delete'></th>
        {isLoading ? (
          <tr className='box-loading'>
            <td colSpan='5'>
              <Loading />
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr className='box-none'>
            <td colSpan='5'>???????????? ???????????? ????????????.</td>
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
      </div>
      <div className='box-paging'>
        <Pagination
          activePage={page}
          itemsCountPerPage={7}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          paginate={setPage}
        />
      </div>
      {confirm ? (
        <ConfirmMatch
          setConfirm={setConfirm}
          setDeleteId={setDeleteId}
          deleteMatch={deleteMatch}
        />
      ) : (
        ''
      )}
      {modal ? (
        <ModalMatch
          setModal={setModal}
          setDeleteId={setDeleteId}
          getMatchData={getMatchData}
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
      <td>
        {el.reserved_at.slice(0, 10) + ' ' + el.reserved_at.slice(11, 16)}
      </td>
      <td>
        <span className='text-location'>{el.placeName}</span>
      </td>
      <td>
        {el.guestNickname
          ? el.hostNickname + ' /\n' + el.guestNickname
          : el.hostNickname}
      </td>
      <td>
        {el.isMatched === false
          ? '?????????'
          : el.isMatched === true
          ? '??????'
          : '??????'}
      </td>
      <td>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className='btn-delete'
          onClick={() => {
            setConfirm(true);
            setDeleteId(el.postId);
          }}
        />
      </td>
    </tr>
  );
};

function ConfirmMatch({ setConfirm, setDeleteId, deleteMatch }) {
  return (
    <div className='confirmmatch-container'>
      <div className='box-confirm'>
        <div className='confirm-message'>?????? ????????? ?????????????????????????</div>
        <div className='box-confirm-btn'>
          <span
            id='btn-cancel'
            onClick={() => {
              setConfirm(false);
              setDeleteId(null);
            }}
          >
            ??????
          </span>
          <span
            id='btn-confirm'
            onClick={async () => {
              await setConfirm(false);
              await deleteMatch();
            }}
          >
            ??????
          </span>
        </div>
      </div>
    </div>
  );
}

function ModalMatch({ setModal, setDeleteId, getMatchData }) {
  return (
    <div className='modalmatch-container'>
      <div className='box-modal'>
        <div className='modal-message'>?????????????????????.</div>
        <div>
          <span
            onClick={() => {
              setModal(false);
              setDeleteId(null);
              getMatchData();
            }}
          >
            ??????
          </span>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({ setErrorModal, setDeleteId }) {
  return (
    <div className='modalmatch-container'>
      <div className='box-modal'>
        <div className='modal-message'>????????? ???????????????.</div>
        <div>
          <span
            onClick={() => {
              setErrorModal(false);
              setDeleteId(null);
            }}
          >
            ??????
          </span>
        </div>
      </div>
    </div>
  );
}

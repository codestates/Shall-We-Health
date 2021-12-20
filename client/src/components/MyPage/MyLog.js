import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../etc/Loading';
import Issue from './Issue';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as unFaThumbsUp } from '@fortawesome/free-regular-svg-icons';

export default function MyLog() {
  const { id } = useSelector((state) => state.loginReducer);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [issue, setIssue] = useState(false);
  const [issueInfo, setIssueInfo] = useState({
    postId: null,
    targetId: null,
    targetNickname: null,
  });

  const getLogData = async () => {
    await setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_API}/mypage/${res.data.data.decoded.id}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setData(res.data.data);
          })
          .catch(() => {
            setModal(true);
          });
      })
      .catch(() => {
        setModal(true);
      });
    await setIsLoading(false);
  };

  const handleIssueInfo = (el) => {
    if (id === el.hostId) {
      setIssueInfo({
        postId: el.postId,
        targetId: el.guestId,
        targetNickname: el.guestNickname,
      });
    } else {
      setIssueInfo({
        postId: el.postId,
        targetId: el.hostId,
        targetNickname: el.hostNickname,
      });
    }
  };

  const pushThumbsUp = (el) => {
    if (el.hostId === id) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_API}/mypage`,
          {
            postId: el.postId,
            giverId: id,
            receiverId: el.guestId,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .get(
                  `${process.env.REACT_APP_SERVER_API}/mypage/${res.data.data.decoded.id}`,
                  {
                    withCredentials: true,
                  }
                )
                .then((res) => {
                  setData(res.data.data);
                });
            });
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_API}/mypage`,
          {
            postId: el.postId,
            giverId: id,
            receiverId: el.hostId,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .get(
                  `${process.env.REACT_APP_SERVER_API}/mypage/${res.data.data.decoded.id}`,
                  {
                    withCredentials: true,
                  }
                )
                .then((res) => {
                  setData(res.data.data);
                });
            });
        });
    }
  };

  const deleteThumbsUp = (el) => {
    if (el.hostId === id) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_API}/mypage`, {
          data: {
            postId: el.postId,
            giverId: id,
            receiverId: el.guestId,
          },
          withCredentials: true,
        })
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .get(
                  `${process.env.REACT_APP_SERVER_API}/mypage/${res.data.data.decoded.id}`,
                  {
                    withCredentials: true,
                  }
                )
                .then((res) => {
                  setData(res.data.data);
                });
            });
        });
    } else {
      axios
        .delete(
          `${process.env.REACT_APP_SERVER_API}/mypage`,
          {
            data: {
              postId: el.postId,
              giverId: id,
              receiverId: el.hostId,
            },
            withCredentials: true,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .get(
                  `${process.env.REACT_APP_SERVER_API}/mypage/${res.data.data.decoded.id}`,
                  {
                    withCredentials: true,
                  }
                )
                .then((res) => {
                  setData(res.data.data);
                });
            });
        });
    }
  };

  useEffect(() => {
    getLogData();
  }, []);

  

  return (
    <div className='mylog-container'>
      <table className='table-data-th'>
        <th className='date'>일시</th>
        <th className='location'>장소</th>
        <th className='hostGuest'>모집/매칭 인원</th>
        <th className='match'></th>
        <th className='etc'></th>
      </table>
      <div className='table-scroll'>
        <table className='table-data'>
          {isLoading ? (
            <tr className='box-loading'>
              <td colSpan='5'>
                <Loading />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr className='box-none'>
              <td colSpan='5'>매칭 내역이 없습니다.</td>
            </tr>
          ) : (
            data.map((el, i) => {
              return (
                <DataRow
                  el={el}
                  key={i}
                  handleIssueInfo={handleIssueInfo}
                  setIssue={setIssue}
                  deleteThumbsUp={deleteThumbsUp}
                  pushThumbsUp={pushThumbsUp}
                />
              );
            })
          )}
        </table>
      </div>
      {modal ? <Modal setModal={setModal} /> : ''}
      {issue ? <Issue setIssue={setIssue} issueInfo={issueInfo} /> : ''}
    </div>
  );
}

const DataRow = ({
  el,
  handleIssueInfo,
  setIssue,
  deleteThumbsUp,
  pushThumbsUp,
}) => {
  return (
    <tr className={el.isMatched === 2 ? 'canceled' : ''}>
      <td className='date'>
        <Link
          to={`/view/${el.postId}`}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <span>
            {el.reserved_at.slice(0, 10) + ' ' + el.reserved_at.slice(11, 16)}
          </span>
        </Link>
      </td>
      <td className='location'>
        <Link
          to={`/view/${el.postId}`}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <span>{el.place_name}</span>
        </Link>
      </td>
      <td className='hostGuest'>
        <Link
          to={`/view/${el.postId}`}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <span>
            {el.guestNickname
              ? el.hostNickname + ' /\n' + el.guestNickname
              : el.hostNickname}
          </span>
        </Link>
      </td>
      <td className='match'>
        <Link
          to={`/view/${el.postId}`}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <span>{!el.isMatched ? '모집중' : '마감'}</span>
        </Link>
      </td>
      <td className='etc'>
        {el.isMatched === 2 ? (
          <div className='text-canceled'>취소 완료</div>
        ) : el.isMatched ? (
          <div className='like-issue'>
            {el.thumbsup ? (
              <FontAwesomeIcon
                icon={faThumbsUp}
                className='btn-thumbsup'
                onClick={() => {
                  deleteThumbsUp(el);
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={unFaThumbsUp}
                className='btn-thumbsup'
                onClick={() => {
                  pushThumbsUp(el);
                }}
              />
            )}
            <span
              className='btn-issue'
              onClick={async () => {
                await handleIssueInfo(el);
                await setIssue(false);
                await setIssue(true);
              }}
            >
              신고
            </span>
          </div>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
};

function Modal({ setModal }) {
  return (
    <div className='modalmylog-container'>
      <div className='box-modal'>
        <div className='modal-message'>올바른 접근이 아닙니다.</div>
        <div>
          <span
            onClick={() => {
              window.location.replace('/');
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

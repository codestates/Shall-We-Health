/* global kakao */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './View.css';
import Chat from '../components/View.js/Chat';
import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_SERVER_API);

export default function View({ match }) {

  const postNumber = match.params.postId
  const [sbdResult, setSbdResult] = useState([])
  const [bodypartArr, setBodypartArr] = useState([])
  const [messageResult, setMessageResult] = useState('')
  const [nickname, setNickname] = useState('')
  const [loca, setLoca] = useState('')
  const [reserveDate, setReserveDate] = useState('')
  const [searchPlace, setSearchPlace] = useState('')
  const [ismatched, setIsMatched] = useState('')
  const [thumbsUp, setThumbsUp] = useState(0)
  const [showButton, setShowButton] = useState(0)
  const [modal, setModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const userId = useSelector(state => state.loginReducer.id)
  const [hostId, setHostId] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const [data, setData] = useState('')
  const [chatModal, setChatModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  // const [modalMessage2, setModalMessage2] = useState('')
  const [modal2, setModal2] = useState(false)


  const getDetailpost = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_API}/post/${postNumber}`)
      .then((res) => {
        setSbdResult(res.data.data[0].description.sbd)
        setBodypartArr(res.data.data[0].description.bodyPart)
        setMessageResult(res.data.data[0].description.message)
        setNickname(res.data.data[0].hostNickname)
        setLoca(res.data.data[0].location.road_address_name)
        setReserveDate(res.data.data[0].reserved_at)
        // console.log(reserveDate)
        // console.log(reserveDate.slice(0, 10))
        // console.log(reserveDate.slice(5, 7))
        // console.log(reserveDate.slice(8, 10))
        // console.log(reserveDate.slice(11, 13))
        // console.log(reserveDate.slice(14, 16))
        setSearchPlace(res.data.data[0].location)
        setIsMatched(res.data.data[0].isMatched)
        setHostId(res.data.data[0].hostId)
        setThumbsUp(res.data.data[1].hostThumbsups)


        if (ismatched === false && res.data.data[0].hostId !== userId) {
          setShowButton(0);
        } else if (ismatched === false && res.data.data[0].hostId === userId) {
          setShowButton(1);
        } else if (
          (ismatched === true && res.data.data[0].hostId === userId) ||
          (ismatched === true && res.data.data[0].guestId === userId)
        ) {
          setShowButton(2);
        } else if (
          (ismatched === true && res.data.data[0].hostId !== userId) ||
          (ismatched === true && res.data.data[0].guestId !== userId)
        ) {
          setShowButton(3);
        } else if (ismatched === 2) {
          setShowButton(4);
        }

        else if (ismatched === 2) {
          setShowButton(4)
        }
        console.log(postNumber)
        console.log(hostId)
        console.log(showButton)
        console.log(ismatched)
        console.log(match)
        console.log(userId)
        console.log(res.data.data)
        setData(res.data.data[0])
        // await axios.get(`${process.env.REACT_APP_SERVER_API}/post/${postNumber}`)
      }
      )
  }

  function CreateModal({ setModal, modalMsg }) {
    return (
      <div className='modalmatch-container'>
        <div className='box-modal'>
          <div className='modal-message'>{modalMsg}</div>
          <div>
            <span
              onClick={() => {
                setModal(false);
                window.location.reload();
              }}
            >
              {/* {modalMsg === '취소하시겠습니까? 일방적인 취소는 신고사유가 될 수 있습니다.' ? '취소' : '확인'} */}
              확인
            </span>
          </div>
        </div>
      </div>
    );
  }

  function CreateModal({ setModal2, modalMsg }) {
    return (
      <div className='modalmatch-container'>
        <div className='box-modal'>
          <div className='modal-message'>{modalMsg}</div>
          <div>
            <span
              onClick={() => {
                setModal2(false);
                window.location.replace('/board')
              }}
            >
              {/* {modalMsg === '취소하시겠습니까? 일방적인 취소는 신고사유가 될 수 있습니다.' ? '취소' : '확인'} */}
              확인
            </span>
          </div>
        </div>
      </div>
    );
  }



  const applyClick = () => {

    if (!userId) {
      setModalMsg('로그인 후 이용해주세요.');
      setModal(true);
    }
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_API}/post/${postNumber}/match`,
        {
          apply: true,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          // window.location.reload()
          setModalMsg('신청이 완료되었습니다. 채팅방 이용이 가능합니다.');
          setModal(true);
        }
        if (res.status === 204) {
          setModalMsg('이미 신청하셨거나, 모집글을 올리셨습니다.');
          setModal(true);
        }
      });
  };

  const cancelClick = () => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_API}/post/${postNumber}/match`,
        {
          cancel: true,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          // window.location.reload()
          setModalMsg(
            '취소되었습니다. 일방적인 취소는 신고사유가 될 수 있습니다.'
          );
          setModal(true);
        }
      });
  };

  const deleteClick = () => {

    if (postNumber && hostId) {
      const postId = Number(postNumber)
      axios.delete(`${process.env.REACT_APP_SERVER_API}/post`,
        {
          data:
          {
            postId: postId,
            hostId: hostId
          },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 204) {
            setModalMsg('게시물이 삭제되었습니다.')
            setModal2(true)
          }
        })
    }
  }

  const modifyClick = () => {
    if (hostId === userId)
      window.location.replace(`/modify/${postNumber}`)
  }

  function MakeBodyPartButton({ el }) {
    return <button className='view-body-options'>{el}</button>;
  }

  const chatting = () => {
    const { hostId, guestId } = data
    if (ismatched !== true) {
      /* 취소 된 파트너 isMatched === 2 or isMatched === false */
      setModalMessage('매칭 된 상대만 대화 할 수 있습니다');
      setChatModal(true);
    }
    else if (ismatched === true) {
      const reserved = reserveDate.slice(0, reserveDate.length - 1);
      const chatCloseTime = new Date(reserved);
      const now = new Date();
      chatCloseTime.setHours(chatCloseTime.getHours() + 2);

      if (now > chatCloseTime) {
        setModalMessage('마감 된 채팅방입니다');
        setChatModal(true);
      } else {
        if (hostId === userId || guestId === userId) {
          setChatOpen(true);
          socket.emit('join_room', postNumber);
        } else {
          setModalMessage('매칭 된 상대만 대화 할 수 있습니다');
          setChatModal(true);
        }
      }
    }
  };

  function copyClick() {
    navigator.clipboard.writeText(loca);
  }

  useEffect(() => {
    getDetailpost();
  }, [userId, ismatched]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(searchPlace.y, searchPlace.x),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);
    // const ps = new kakao.maps.services.Places();
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px">' +
          place.place_name +
          '</div>'
        );
        infowindow.open(map, marker);
      });
    }
    displayMarker(searchPlace);
  }, [searchPlace]);



  return <div className='view-container'>
    <div id='map' style={{ width: '100%', height: '45vh', zIndex: 0 }}></div>
    <div className='whole-view'>
      <div className='main-container'>
        <div className='components-container'>

          <div className='tab-menu'>
            <div className='match-chat-tab'>
              <div className='match-info-tab' onClick={() => { setChatOpen(false) }}>매칭정보</div>
              <div className='chat-tab' onClick={() => { chatting() }}>채팅하기</div>
            </div>
            <div className={userId === hostId && ismatched === false ? 'edit-delete-tab' : 'edit-delete-tab none'} >
              <div className='edit-tab' onClick={modifyClick}>수정</div>
              <div className='delete-tab' onClick={deleteClick}>삭제</div>

            </div>

            {chatOpen ? (
              <Chat data={data} postId={postNumber} socket={socket} />
            ) : (
              <>
                <div className='bodypart-result'>
                  <div className='bodypart-title'>운동부위</div>
                  {bodypartArr.map((el, id) => {
                    return <MakeBodyPartButton key={id} el={el} />;
                  })}
                </div>

                <div className='weight-result'>
                  <div className='weight-title'>3대 운동 중량</div>
                  <button className='view-weight-options'>{sbdResult}</button>
                </div>

                <div className='message-result'>
                  <div className='message-title'>파트너에게 한마디</div>
                  <div className='message-content'>{messageResult}</div>
                </div>
              </>
            )}

        </div>
        <div className='info-container'>
          <div className='info-user'>
            <div className='info-user-nickname'>{nickname}님</div><div className='thumbsups-count'>추천({thumbsUp})</div>
          </div>
          <div className='date-address-section'>
            <div className='info-date'>
              {`${reserveDate.slice(0, 4)}년 

            ${reserveDate.slice(5, 7)}월
            ${reserveDate.slice(8, 10)}일
            ${reserveDate.slice(11, 13)}:${reserveDate.slice(14, 16)}`}
              </div>

              <div className='address-section'>
                <div className='info-address'>{loca}</div>
                <div className='address-copy' onClick={copyClick}>
                  주소 복사
                </div>
              </div>
            </div>
            <div className='button-section'>
              {showButton === 0 ? (
                <button className='application-button' onClick={applyClick}>
                  신청하기
                </button>
              ) : showButton === 1 ? (
                <button className='match-now-button'>모집중</button>
              ) : showButton === 2 ? (
                <button className='match-cancel-button' onClick={cancelClick}>
                  매칭취소
                </button>
              ) : showButton === 3 ? (
                <button className='deadline-button'>마감</button>
              ) : (
                <button className='deadline-button'>마감</button>
              )}
            </div>
          </div>

          <div
            onClick={() => {
              setChatModal(false);
            }}
            className={chatModal ? 'modal-container' : 'modal-container hidden'}
          >
            <div className='box-modal'>
              <div className='modal-message'>{modalMessage}</div>
              <div>
                <span
                  onClick={() => {
                    setChatModal(false);
                  }}
                >
                  확인
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal ? <CreateModal setModal={setModal} modalMsg={modalMsg} /> : ''}
    </div>

    {modal ? <CreateModal setModal={setModal} modalMsg={modalMsg} /> : ''}
    {modal2 ? <CreateModal setModal2={setModal2} modalMsg={modalMsg} /> : ''}
  </div>;

}

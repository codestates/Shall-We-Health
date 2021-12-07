/* global kakao */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './View.css';


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



  const getDetailpost = () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/post/${postNumber}`)
      .then((res) => {
        setSbdResult(res.data.data[0].description.sbd)
        setBodypartArr(res.data.data[0].description.bodyPart)
        setMessageResult(res.data.data[0].description.message)
        setNickname(res.data.data[0].hostNickname)
        setLoca(res.data.data[0].location.road_address_name)
        setReserveDate(res.data.data[0].reserved_at)
        setSearchPlace(res.data.data[0].location)
        setIsMatched(res.data.data[0].isMatched)
        // console.log(res.data.data)
      }
      )
  }

  function MakeBodyPartButton({ el }) {
    return (
      <button className='view-body-options'>{el}</button>
    )
  }

  function copyClick() {
    navigator.clipboard.writeText(loca)
  }

  useEffect(() => {
    getDetailpost()
  }, [])



  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(searchPlace.y, searchPlace.x),
      level: 2
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent('<div style="padding:5px;font-size:12px">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
    displayMarker(searchPlace)
  }, [searchPlace]);










  return <div className='view-container'>
    <div id='map' style={{ width: '100%', height: '45vh', zIndex: 0 }}></div>
    <div className='whole-view'>
      <div className='main-container'>
        <div className='components-container'>

          <div className='tab-menu'>
            <div className='match-chat-tab'>
              <div className='match-info-tab'>매칭정보</div>
              <div className='chat-tab' >채팅하기</div>
            </div>
            <div className='edit-delete-tab'>
              <div className='edit-tab'>수정</div>
              <div className='delete-tab'>삭제</div>
            </div>
          </div>

          <div className='bodypart-result'>
            <div className='bodypart-title'>운동부위</div>
            {
              bodypartArr.map((el, id) => {
                return (
                  <MakeBodyPartButton key={id} el={el} />
                )
              })
            }
          </div>

          <div className='weight-result'>
            <div className='weight-title'>3대 운동 중량</div>
            <button className='view-weight-options'>{sbdResult}</button>
          </div>

          <div className='message-result'>
            <div className='message-title'>파트너에게 한마디</div>
            <div className='message-content'>{messageResult}</div>
          </div>
        </div>

        <div className='info-container'>
          <div className='info-user-nickname'>{nickname} 님</div>
          <div className='date-address-section'>
            <div className='info-date'>
              {`${reserveDate.slice(0, 4)}년 
            ${reserveDate.slice(5, 7)}월
            ${reserveDate.slice(8, 10)}일
            ${reserveDate.slice(11, 13)}:${reserveDate.slice(14, 16)}`}
            </div>
            <div className='address-section'>
              <div className='info-address'>{loca}</div>
              <div className='address-copy' onClick={copyClick}>주소 복사</div>
            </div>
          </div>
          <div className='button-section'>
            {(ismatched === false) ? <button className='application-button'>신청하기</button>
              : (ismatched === 2) ? <button className='match-cancel-button'>매칭취소</button>
                : <button className='deadline-button'>마감</button>}
          </div>
        </div>

      </div>
    </div>
  </div>;
}

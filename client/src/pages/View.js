/* global kakao */
import React, { useEffect, useState } from 'react';
import FindMap from '../components/FindPartner/FindMap';

import './View.css';

export default function View() {


  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

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
            <button className='view-body-options'>가슴</button>
            <button className='view-body-options'>삼두</button>
            <button className='view-body-options'>복근</button>
            <button className='view-body-options'>유산소</button>
          </div>

          <div className='weight-result'>
            <div className='weight-title'>3대 운동 중량</div>
            <button className='view-weight-options'>200~300kg</button>
          </div>

          <div className='message-result'>
            <div className='message-title'>파트너에게 한마디</div>
            <div className='message-content'>조지죠.</div>
          </div>
        </div>

        <div className='info-container'>

          <div className='info-user-nickname'>형광언더아머 님</div>
          <div className='date-address-section'>
            <div className='info-date'>2021년 11월 30일 화요일 11:00</div>
            <div className='address-section'>
              <div className='info-address'>경기도 안산시 어쩌구</div>
              <div className='address-copy'>주소 복사</div>
            </div>
          </div>
          <div className='button-section'>
            <button className='finding-button'>모집중</button>
            <button className='application-button'>신청하기</button>
            <button className='deadline-button'>마감</button>
            <button className='match-cancel-button'>매칭취소</button>
          </div>
        </div>

      </div>
    </div>
  </div>;
}

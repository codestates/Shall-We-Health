import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';







export default function Home() {
  const onClick = () => {
    window.location.replace('/board')
  }

  AOS.init({ delay: 150 })
  return (
    <div className='home-container'>

      <div className='image-section-main'>
        <img className='main-logo' src='img/logo.svg' alt='logo' />
        <button className='button-find-partner' onClick={onClick}>파트너찾으러가기</button>
      </div>

      <div className='explain-section-1'>
        <p data-aos="fade-up" className='explain-text-1'>혼자하는 헬스는 이제 그만,
          <br />전국 헬스장에서 당신의 운동파트너를 찾아보세요.
          <br />Shall We Health와 함께라면 가능합니다.
        </p>
      </div>

      <div className='explain-section-2'>
        <div data-aos="fade-up" className='section-2-head'>
          <p className='section-2-title'>신청게시판</p>
          <p className='section-2-text'>
            게시판에서
            <br />원하는 날짜, 시간, 장소에
            <br />같이 운동할 파트너가 있는지 <br />찾아보세요.</p>
        </div>

        <div data-aos="fade-left" className='section-2-body'>
          <img className='section-2-board' src='/img/board.png' alt='board' />
        </div>
      </div>

      <div className='explain-section-3'>
        <div data-aos="fade-up" className='section-3-head'>
          <p className='section-3-title'>상세페이지</p>
          <p className='section-3-text'>
            원하는 게시물의 상세정보를
            <br /> 확인하고 신청하세요.
          </p>
        </div>
        <div data-aos="fade-left" className='section-3-body'>
          <img className='section-3-view' src='/img/view.png' alt='board' />
        </div>
      </div>

      <div className='explain-section-4'>
        <div data-aos="fade-up" className='section-4-head'>
          <p className='section-4-title'>게시물작성</p>
          <p className='section-4-text'>
            내가 운동하고자 하는 시간, <br /> 장소를선택하세요
          </p>
        </div>
        <div data-aos="fade-left" className='section-4-body'>
          <img className='section-4-FPtop' src='/img/findpartnertop.png' alt='findpartner' />
        </div>
      </div>

      <div className='explain-section-5'>
        <div data-aos="fade-up" className='section-5-head'>
          <p className='section-5-title'>게시물작성</p>
          <p className='section-5-text'>
            나의 운동 레벨과  <br /> 운동하고싶은 부위를 선택 후,<br />
            파트너에게 하고싶은 말을
            <br />작성해주세요.
          </p>
        </div>
        <div data-aos="fade-left" className='section-5-body'>
          <img className='section-5-FPbot' src='/img/findpartnerbot.png' alt='findparter' />
        </div>
      </div>

    </div>

  )



}

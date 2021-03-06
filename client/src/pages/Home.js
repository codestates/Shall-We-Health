import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { useEffect } from 'react';







export default function Home() {
  const onClick = () => {
    window.location.replace('/board')
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  AOS.init({ delay: 150 })
  return (
    <div className='home-container'>

      <div className='image-section-main'>
        <img className='main-logo' src='img/logo.svg' alt='logo' />
        <button className='button-find-partner' onClick={onClick}>메이트찾으러가기</button>
      </div>

      <div className='explain-section-1'>
        <p data-aos="fade-up" className='explain-text-1'>혼자하는 헬스는 이제 그만,
          <br />전국 헬스장에서 당신의 운동 메이트를 찾아보세요.
          <br />Shall We Health와 함께라면 가능합니다.
        </p>
      </div>

      <div className='explain-section-2'>
        <div data-aos="fade-up" className='section-2-head'>
          <p className='section-2-title web'>신청게시판</p>
          <p className='section-2-text'>
            게시판에서
            <br />원하는 날짜, 시간, 장소에
            <br />같이 운동할 메이트가 있는지 <br />찾아보세요.</p>
        </div>

        <div data-aos="fade-left" className='section-2-body'>
          <div className='section-2-title mobile'>신청게시판</div>
          <img className='section-2-board' src='/img/board.png' alt='board' />
        </div>
      </div>

      <div className='explain-section-3'>
        <div data-aos="fade-up" className='section-3-head'>
          <p className='section-3-title web'>상세페이지</p>
          <p className='section-3-text'>
            원하는 게시물의 상세정보를
            <br /> 확인하고 신청하세요.
          </p>
        </div>
        <div data-aos="fade-left" className='section-3-body'>
          <div className='section-3-title mobile'>상세페이지</div>
          <img className='section-3-view' src='/img/view.png' alt='board' />
        </div>
      </div>

      <div className='explain-section-4'>
        <div data-aos="fade-up" className='section-4-head'>
          <p className='section-4-title web'>게시물작성</p>
          <p className='section-4-text'>
            내가 운동하고자 하는 시간, <br /> 장소를 선택하세요.
          </p>
        </div>
        <div data-aos="fade-left" className='section-4-body'>
          <div className='section-4-title mobile'>게시물작성</div>
          <img className='section-4-FPtop' src='/img/findpartnertop.png' alt='findpartner' />
        </div>
      </div>

      <div className='explain-section-5'>
        <div data-aos="fade-up" className='section-5-head'>
          <p className='section-5-title web'>게시물작성</p>
          <p className='section-5-text'>
            나의 운동 레벨과  <br /> 운동하고 싶은 부위를 선택 후,<br />
            메이트에게 하고 싶은 말을
            <br />작성해주세요.
          </p>
        </div>
        <div data-aos="fade-left" className='section-5-body'>
          <div className='section-5-title mobile'>게시물작성</div>
          <img className='section-5-FPbot' src='/img/findpartnerbot.png' alt='findparter' />
        </div>
      </div>

      <div className='explain-section-6'>
        <div data-aos="fade-up" className='section-6-head'>
          <p className='section-6-title web'>채팅하기</p>
          <p className='section-6-text'>
            신청에 성공하면<br />
            모집자와 신청자가<br /> 채팅방을 이용할 수 있습니다.
          </p>
        </div>
        <div data-aos="fade-left" className='section-6-body'>
          <div className='section-6-title mobile'>채팅하기</div>
          <img className='section-6-chat' src='/img/chat.png' alt='chat' />
        </div>
      </div>

      <div className='button-section'>
        <div data-aos="fade-up" className='button-section-1'>
          <div className='btn-1-text'>지금 바로 다른 사람과<br /> 운동하러 가보세요.</div>
          <Link
            to='/board'
            style={{ color: 'inherit', textDecoration: 'inherit' }}><button className='btn-1-btn' >메이트 신청하기</button></Link>
        </div>

        <div data-aos="fade-up" className='button-section-2'>
          <div className='btn-2-text'>내가 원하는 시간에<br />메이트를 모집해보세요.</div>
          <Link
            to='/find-partner'
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          ><button className='btn-2-btn' >메이트 모집하기</button></Link>
        </div>

        <div data-aos="fade-up" className='button-section-3'>
          <div className='btn-3-text'>아직 회원이 아니신가요?<br /> 회원가입 후<br /> 나의 운동메이트를 찾아보세요.</div>
          <Link
            to='/signup'
            style={{ color: 'inherit', textDecoration: 'inherit' }}><button className='btn-3-btn' >회원가입 하러가기</button></Link>
        </div>
      </div>
    </div>

  )



}

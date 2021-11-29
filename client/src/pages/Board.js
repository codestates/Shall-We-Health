import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { dummyData } from './dummyData';
import Pagination from 'react-js-pagination';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Board.css";

export default function Board() {

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(100)
  const [ selectDate, setSelectDate ] = useState(0)
  const [ selectLocation, setSelectLocation] = useState('전체')

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
  };
  
  const getDateArr = (n) => {
    let today = new Date();
    let date = new Date(today.setDate(today.getDate() + n));
    let day = date.getDate();
    return day;
  };

  const getDaysArr = (n) => {
    let today = new Date();
    let days = ["일", "월", "화", "수", "목", "금", "토"];
    let date = new Date(today.setDate(today.getDate() + n));
    return days[date.getDay()];
  };
  const dateArray = Array.from({ length: 14 }, (v, i) => getDateArr(i));
  const daysArray = Array.from({ length: 14 }, (v, i) => getDaysArr(i));

  const locationArr = ['전체', '서울', '경기', '인천', '대전', '충북', '충남', '대구', '부산', '울산', '경북', '경남', '광주', '전북', '전남', '강원', '제주']

  return (
    <div className="board-container">
      <div className="box-banner">
        <BannerSlider />
      </div>
      <div className="box-date">
      <Slider {...settings}>
        {dateArray.map((el,i)=> {
          return(
            <DateBtn selectDate={selectDate} setSelectDate={setSelectDate} key={i} i={i} date={el} days={daysArray[i]}/>
          )
        })}
      </Slider>
      </div>
        <ul className='box-location'>
          {locationArr.map((el,i) => {
            return (
              <li className={selectLocation===el ? 'btn-selected-location' : 'btn-location'} onClick={(e)=>{setSelectLocation(e.target.innerText)}}>{el}</li>
            )
          })}
      </ul>
      <div className='box-filter'>
          <input type='checkbox' id='match-out' className='match-check-box'/>
          <label for='match-out' className='text-match'>신청 가능만 보기</label>
          <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='헬스장 명을 입력하세요'
          ></input>
          <span>
            <button id='searchButton'>
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </span>
        </div>
      </div>
      <div className='box-list'>
        <table className='table-data'>
          {dummyData.map((el,i)=> {
            return(
              <RowData el={el} key={i}/>
            )
          })}
        </table>
      </div>
      <div className='box-pagination'>
        <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={setPage}
        />
      </div>
    </div>
  );
}

function BannerSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <Banner />
        <Banner />
        <Banner />
      </Slider>
    </div>
  );
}

function Banner() {
  return (
    <div className="banner">
      <img className="img-banner" alt="logo" src="img/logo.svg" />
    </div>
  );
}

function DateBtn({ selectDate, setSelectDate, days, date, i }) {
  return (
    <div className={selectDate===i ? "btn-selected-date" : 'btn-date'} onClick={()=>{setSelectDate(i)}}>
      <div className={days==='토' ? 'date blue' : (days==='일' ? 'date red' : 'date')}>{date}</div>
      <div className={days==='토' ? 'days blue' : (days==='일' ? 'days red' : 'days')}>{days}</div>
    </div>
  );
}

function RowData({el}) {
  return(
    <tr>
            <td className='time'>{el.time.length===4? '0'+el.time : el.time}</td>
            <td className='info'>
              <div className='title'>{el.location.address_name.slice(0,2)+' '+el.location.place_name}</div>
              <div className='sub-info'>3대 {el.description.sbd} {el.description.bodyPart.join(' ')}</div>
            </td>
            <td className='match'>
              {el.isMatched===0 ? <div className='btn-match'>신청 가능</div> : <div className='btn-match-end'>마감</div>}
            </td>
          </tr>
  )
}
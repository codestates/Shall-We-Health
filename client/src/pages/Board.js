import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/etc/Loading';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination/Pagination';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Board.css";

export default function Board() {

  const [page, setPage] = useState(1)

  const [count, setCount] = useState(0)
  const [ selectDate, setSelectDate ] = useState(0)
  const [ selectLocation, setSelectLocation] = useState('전체')
  const [ locationForm, setLocationForm ] = useState('%')
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isMatched, setIsMatched ] = useState(null)
  const [ keyword, setKeyword ] = useState(null)

  const [ScrollY, setScrollY] = useState(0);  // 스크롤값을 저장하기 위한 상태
  const [btnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    }
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    }
  })

  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);  // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
  };

  const getDateForm = (n) => {
    let today = new Date();
    let date = new Date(today.setDate(today.getDate() + n));
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  }

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

  const handleLocation = (e) => {
    setSelectLocation(e.target.innerText)
    if (e.target.innerText === '전체') {
      setLocationForm('%')
    } else {
      setLocationForm(e.target.innerText)
    }
  }

  const hadleKeyword = (e) => {
    if (e.target.value === '') {
      setKeyword(null)
    } else {
      setKeyword(e.target.value)
    }
  }

  //데이터 요청
  const getData = async () => {
    await setIsLoading(true)
    await axios.get(`${process.env.REACT_APP_SERVER_API}/post`, {
      params: {
        date: getDateForm(selectDate),
        location: locationForm,
        page,
        isMatched,
        keyword
      }
    })
      .then((res) => {
        setData(res.data.data)
        console.log(res.data.data)
        setCount(res.data.count)
      })
    await setIsLoading(false)
  }

  const getDataPage = () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/post`, {
      params: {
        date: getDateForm(selectDate),
        location: locationForm,
        page,
        isMatched,
        keyword
      }
    })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
        handleTop();
      })
  }

  useEffect(() => {
    getData();
  }, [selectDate, locationForm, isMatched])


  useEffect(() => {
    getDataPage();
  }, [page])

  return (
    <div className="board-container">
      <div className="box-banner">
        <BannerSlider />
      </div>
      <div className="box-date">
        <Slider {...settings}>
          {dateArray.map((el, i) => {
            return (
              <DateBtn selectDate={selectDate} setSelectDate={setSelectDate} key={i} i={i} date={el} days={daysArray[i]} />
            )
          })}
        </Slider>
      </div>
      <ul className='box-location'>
        {locationArr.map((el, i) => {
          return (
            <li className={selectLocation === el ? 'btn-selected-location' : 'btn-location'} onClick={handleLocation}>{el}</li>
          )
        })}
      </ul>
      <div className='box-filter'>
        <input type='checkbox' id='match-out' className='match-check-box' checked={isMatched} onChange={(e) => {
          if (!e.target.checked) {
            setIsMatched(null)
          } else {
            setIsMatched(e.target.checked)
          }
        }} />
        <label for='match-out' className='text-match'>신청 가능만 보기</label>
        <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='헬스장 명을 입력하세요'
            onChange={hadleKeyword}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                getData();
              }
            }}
          ></input>
          <span>
            <button id='searchButton' onClick={getData}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
        </div>
      </div>
      <div className='box-list'>
        <table className='table-data'>
          {isLoading ? (
            <tr className='box-loading'>
              <td colSpan='3'>
                <Loading />
              </td>
            </tr>
          ) : (data.length === 0 ? (
            <tr className='box-none'>
              <td colSpan='3'>일치하는 게시물이 없습니다.</td>
            </tr>
          ) : (data.map((el, i) => {
            return (
              <RowData el={el} key={i} />
            )
          })))}
        </table>
      </div>
      <div className='box-pagination'>
      <Pagination
          activePage={page}
          itemsCountPerPage={15}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          paginate={setPage}
        />
      </div>
      <div className={btnStatus ? 'btn-top' : 'btn-top none'} onClick={handleTop}><FontAwesomeIcon icon={faCaretUp} /></div>
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
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };
  return (
    <div>
      <Slider {...settings}>
        <Banner1 />
        <Banner2 />
      </Slider>
    </div>
  );
}

function Banner1() {
  return (
    <div className="banner">
      <img className="img-banner" alt="banner1" src="img/banner1.png" />
      <div className='text-banner'>쉘위헬스에서 나의 헬스 메이트를 찾아보세요</div>
    </div>
  );
}

function Banner2() {
  return (
    <div className="banner">
      <img className="img-banner" alt="banner2" src="img/banner2.png" />
      <div className='text-banner'>쉘위헬스에서 나의 헬스 메이트를 찾아보세요</div>
    </div>
  );
}

function DateBtn({ selectDate, setSelectDate, days, date, i }) {
  return (
    <div className={selectDate === i ? "btn-selected-date" : 'btn-date'} onClick={() => { setSelectDate(i) }}>
      <div className={days === '토' ? 'date blue' : (days === '일' ? 'date red' : 'date')}>{date}</div>
      <div className={days === '토' ? 'days blue' : (days === '일' ? 'days red' : 'days')}>{days}</div>
    </div>
  );
}

function RowData({ el }) {
  return (
    <tr>
      <td className='time'><Link to={`/view/${el.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{el.reserved_at.slice(11, 16)}</Link></td>
      <td className='info'>
        <div className='title'><Link to={`/view/${el.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{el.addressName.split(' ')[1].slice(0,-1) + ' ' + el.placeName}</Link></div>
        <div className='sub-info'><Link to={`/view/${el.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>3대 {el.description.sbd} {el.description.bodyPart.join(' ')}</Link></div>
      </td>
      <td className='match'>
        <Link to={`/view/${el.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          {!el.isMatched ? <div className='btn-match'>신청 가능</div> : <div className='btn-match-end'>마감</div>}
        </Link>
      </td>
    </tr>
  )
}

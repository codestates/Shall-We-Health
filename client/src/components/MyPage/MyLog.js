import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as unFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

export default function MyLog() {

  const [ thumsUp, setThumsUp ] = useState(false)

  const dummyData = [{
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: '김소현',
    isMatched: 2,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: '김소현',
    isMatched: 2,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: null,
    isMatched: 0,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: null,
    isMatched: 0,
  },
{
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: '김소현',
    isMatched: 1,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: '김소현',
    isMatched: 1,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: null,
    isMatched: 0,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: null,
    isMatched: 0,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: '김소현',
    isMatched: 2,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: '김소현',
    isMatched: 1,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: null,
    isMatched: 0,
  },
  {
    date: '11/23(화) 08:00',
    location: '부천 문선영 헬스클럽',
    host: '문선영',
    guest: null,
    isMatched: 0,
  },]
  
  return (
  <div className='mylog-container'>
    <table className="table-data-th">
    <th className="date">일시</th>
        <th className="location">장소</th>
        <th className="hostGuest">모집/매칭 인원</th>
        <th className="match"></th>
        <th className="etc"></th>
        </table>
        <div className='table-scroll'>
        <table className="table-data">
        {dummyData.length === 0 ? (
          <tr className="box-none">
            <td colSpan="5">일치하는 데이터가 없습니다.</td>
          </tr>
        ) : (
          dummyData.map((el, i) => {
            return <DataRow el={el} key={i} thumsUp={thumsUp} setThumsUp={setThumsUp}/>;
          })
        )}
      </table>
        </div>
    
  </div>
  )
}

const DataRow = ({ el, thumsUp, setThumsUp }) => {
  return (
    <tr className={el.isMatched===2 ? 'canceled' : ''}>
      <td className="date"><span>{el.date}</span></td>
      <td className="location"><span>{el.location}</span></td>
      <td className="hostGuest"><span>{el.guest ? `${el.host}/${el.guest}` : el.host}</span></td>
      <td className="match"><span>{el.isMatched===0 ? '모집중' : '마감'}</span></td>
      <td className="etc">
      {el.isMatched===2 ? (
        <div className='text-canceled'>취소 완료</div>
      )
      : (el.isMatched===1 ?(
        <div className='like-issue'>
        {thumsUp ? <FontAwesomeIcon icon={faThumbsUp} className="btn-thumbsup" onClick={()=>{setThumsUp(!thumsUp)}}/> : <FontAwesomeIcon icon={unFaThumbsUp} className="btn-thumbsup" onClick={()=>{setThumsUp(!thumsUp)}}/>}
        <span className='btn-issue'>신고</span>
        </div>
      ) : ''
        )}
      </td>
    </tr>
  );
};
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,  faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from 'react-js-pagination';

export default function AdminMatch() {
  
  const [count, setCount]= useState(100)
  const [page, setPage]= useState(1)

  const dummyData = [{
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  },
  {
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  },
  {
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  },
  {
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  },
  {
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  },
  {
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  },
  {
    datetime:'11/23(화) 08:00',
    location: '서울 김소현 헬스장',
    hostGuest: '문선영/김소현',
    isMatched: '진행중'
  }
]

  return (
    <div className="adminmatch-container">
      <div className="box-search">
        <div class="search-box">
          <input type="text" id="search"></input>
          <span>
            <button id="searchButton">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
        </div>
      </div>
      <table className='table-data'>
        <th className='date'>일시</th>
        <th className='location'>장소</th>
        <th className='target'>모집/매칭 인원</th>
        <th className='match'>마감여부</th>
        <th className='delete'></th>
        {dummyData.length===0? (
          <tr className='box-none'>
            <td colSpan='5'>
              일치하는 데이터가 없습니다.
            </td>
          </tr>
        ):dummyData.map((el,i)=> {
         return <DataRow el={el} key={i}/>
        })}
      </table>
      <div className='box-paging'>
        <Pagination
            activePage={page}
            itemsCountPerPage={7}
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

const DataRow = ({el}) => {
  return(
    <tr>
      <td>{el.datetime}</td>
      <td>{el.location}</td>
      <td>{el.hostGuest}</td>
      <td>{el.isMatched}</td>
      <td><FontAwesomeIcon
          icon={faTrashAlt}
          className='btn-delete'
        /></td>
    </tr>
  )
}
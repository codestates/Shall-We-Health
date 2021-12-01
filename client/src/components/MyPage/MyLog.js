import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Loading from '../etc/Loading'
import Issue from './Issue'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as unFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

export default function MyLog() {

  const { id } = useSelector((state) => state.loginReducer);
  const [ thumsUp, setThumsUp ] = useState(false)
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [ issue, setIssue ] = useState(false)
  const [ issueInfo, setIssueInfo ] = useState({postId:null, targetId:null, targetNickname:null})


  const getLogData = () =>{
    axios.get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
      withCredentials: true,
    })
    .then((res) =>{
      axios.get(`${process.env.REACT_APP_SERVER_API}/mypage/${res.data.data.id}`)
      .then((res) => {
        setData(res.data.data)
      })
      .catch(()=> {
        setModal(true);
      })
      })
    .catch(()=>{
      setModal(true);
    })
  }

  const handleIssueInfo = (el) => {
    if(id===el.hostId) {
      setIssueInfo({
        postId: el.postId,
        targetId: el.guestId,
        targetNickname: el.guestNickname
      }) } else {
        setIssueInfo({
          postId: el.postId,
          targetId: el.hostId,
          targetNickname: el.hostNickname
        })
      }
    }

  // useEffect(()=>{
  //   getLogData();
  // },[])

  const dummyData = [{
    "hostId" : 10,
    "hostNickname" : "sohhyeon",
    "guestId" : 1,
    "guestNickname" : "moonstar",
    "reserved_at" : "2022-12-06T06:59:00.000Z",
    "location": { "place_name" : "우리동네휘트니스" },
    "isMatched" : 2,
   },{
    "hostId" : 10,
    "hostNickname" : "sohhyeon",
    "guestId" : 25,
    "guestNickname" : "moonstar",
    "reserved_at" : "2022-12-06T06:59:00.000Z",
    "location": { "place_name" : "bodybuild휘트니스" },
    "isMatched" : 1,
},{
    "hostId" : 10,
    "hostNickname" : "sohhyeon",
    "guestId" : 0,
    "guestNickname" : "moonstar",
    "reserved_at" : "2022-12-06T06:59:00.000Z",
    "location": { "place_name" : "workout휘트니스" },
    "isMatched" : 1,
},{
  "hostId" : 10,
  "hostNickname" : "sohhyeon",
  "guestId" : 2,
  "guestNickname" : "moonstar",
  "reserved_at" : "2022-12-06T06:59:00.000Z",
  "location": { "place_name" : "우리동네휘트니스" },
  "isMatched" : 1,
 },{
  "hostId" : 10,
  "hostNickname" : "sohhyeon",
  "guestId" : 25,
  "guestNickname" : "moonstar",
  "reserved_at" : "2022-12-06T06:59:00.000Z",
  "location": { "place_name" : "bodybuild휘트니스" },
  "isMatched" : 1,
},{
  "hostId" : 10,
  "hostNickname" : "sohhyeon",
  "guestId" : 0,
  "guestNickname" : "moonstar",
  "reserved_at" : "2022-12-06T06:59:00.000Z",
  "location": { "place_name" : "workout휘트니스" },
  "isMatched" : 0,
},{
  "hostId" : 10,
  "hostNickname" : "sohhyeon",
  "guestId" : 0,
  "guestNickname" : "moonstar",
  "reserved_at" : "2022-12-06T06:59:00.000Z",
  "location": { "place_name" : "우리동네휘트니스" },
  "isMatched" : 1,
 },{
  "hostId" : 10,
  "hostNickname" : "sohhyeon",
  "guestId" : 25,
  "guestNickname" : "moonstar",
  "reserved_at" : "2022-12-06T06:59:00.000Z",
  "location": { "place_name" : "bodybuild휘트니스" },
  "isMatched" : 1,
},{
  "hostId" : 10,
  "hostNickname" : "sohhyeon",
  "guestId" : 0,
  "guestNickname" : "moonstar",
  "reserved_at" : "2022-12-06T06:59:00.000Z",
  "location": { "place_name" : "workout휘트니스" },
  "isMatched" : 0,
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
        {isLoading? (
          <tr className="box-loading">
          <td colSpan="5">
            <Loading/>
          </td>
        </tr>
        ) : (dummyData.length === 0 ? (
          <tr className="box-none">
            <td colSpan="5">일치하는 데이터가 없습니다.</td>
          </tr>
        ) : (
          dummyData.map((el, i) => {
            return <DataRow el={el} key={i} thumsUp={thumsUp} setThumsUp={setThumsUp} handleIssueInfo={handleIssueInfo} setIssue={setIssue}/>;
          })
        ))}
      </table>
        </div>
      {modal? <Modal setModal={setModal}/> : ''}
      {issue? <Issue setIssue={setIssue} issueInfo={issueInfo}/> : ''}
  </div>
  )
}

const DataRow = ({ el, thumsUp, setThumsUp, handleIssueInfo, setIssue }) => {
  return (
    <tr className={el.isMatched===2 ? 'canceled' : ''}>
      <td className="date"><span>{el.reserved_at.slice(0,10) + ' ' + el.reserved_at.slice(11,16)}</span></td>
      <td className="location"><span>{el.location.place_name}</span></td>
      <td className="hostGuest"><span>{el.guestNickname ? `${el.hostNickname}/${el.guestNickname}` : el.hostNickname}</span></td>
      <td className="match"><span>{el.isMatched===0 ? '모집중' : '마감'}</span></td>
      <td className="etc">
      {el.isMatched===2 ? (
        <div className='text-canceled'>취소 완료</div>
      )
      : (el.isMatched===1 ?(
        <div className='like-issue'>
        {thumsUp ? <FontAwesomeIcon icon={faThumbsUp} className="btn-thumbsup" onClick={()=>{setThumsUp(!thumsUp)}}/> : <FontAwesomeIcon icon={unFaThumbsUp} className="btn-thumbsup" onClick={()=>{setThumsUp(!thumsUp)}}/>}
        <span className='btn-issue' onClick={async()=>{
          await handleIssueInfo(el)
          await setIssue(false)
          await setIssue(true)
          }}>신고</span>
        </div>
      ) : ''
        )}
      </td>
    </tr>
  );
};

function Modal({setModal}) {
  return (
    <div className="modalmylog-container">
    <div className="box-modal">
      <div className="modal-message">올바른 접근이 아닙니다.</div>
      <div>
        <span onClick={()=>{window.location.replace('/')}}>확인</span>
      </div>
    </div>
  </div>
  )
}
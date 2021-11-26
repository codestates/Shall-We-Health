import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import ModalIssue from './ModalIssue';

export default function AdminIssue() {
  const [count, setCount] = useState(100);
  const [page, setPage] = useState(1);
  const [ modalIssue, setModalIssue ] = useState(false)

  const dummyData = [{
    "issue-date": "2020-12-27",
    "date": "2020-12-30 14:51:04",
    "location": "Aţ Ţawīlah",
    "target": "McGeachey",
    "reporter": "Adriana"
  }, {
    "issue-date": "2021-08-14",
    "date": "2021-04-08 08:57:10",
    "location": "Yengimahalla",
    "target": "Sidebottom",
    "reporter": "Emilee"
  }, {
    "issue-date": "2021-02-21",
    "date": "2021-09-07 21:40:47",
    "location": "Lai Lai Bisi Kopan",
    "target": "MacAlister",
    "reporter": "Jordana"
  }, {
    "issue-date": "2021-07-02",
    "date": "2021-06-03 10:58:43",
    "location": "Bungtiang Barat",
    "target": "Pettwood",
    "reporter": "Krystle"
  }, {
    "issue-date": "2021-08-15",
    "date": "2021-05-10 05:23:17",
    "location": "Mberubu",
    "target": "Dungey",
    "reporter": "Jacenta"
  }, {
    "issue-date": "2020-12-27",
    "date": "2020-12-12 16:21:35",
    "location": "Zhongxin",
    "target": "Philott",
    "reporter": "Katie"
  }, {
    "issue-date": "2021-04-12",
    "date": "2021-04-26 16:50:16",
    "location": "Ad Dawḩah",
    "target": "Verbruggen",
    "reporter": "Shalom"
  }];

  return (
    <div className="adminissue-container">
      <table className="table-data">
        <th className="issue-date">신고 날짜</th>
        <th className="date">매칭 일시</th>
        <th className="location">매칭 장소</th>
        <th className="target">신고 대상</th>
        <th className="reporter">신고자</th>
        {dummyData.length === 0 ? (
          <tr className="box-none">
            <td colSpan="5">일치하는 데이터가 없습니다.</td>
          </tr>
        ) : (
          dummyData.map((el, i) => {
            return <DataRow el={el} key={i} setModalIssue={setModalIssue}/>;
          })
        )}
      </table>
      <div className="box-paging">
        <Pagination
          activePage={page}
          itemsCountPerPage={7}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={setPage}
        />
      </div>
      {modalIssue ? <ModalIssue setModalIssue={setModalIssue}/> : ''}
    </div>
  );
}

const DataRow = ({ el, setModalIssue }) => {
  return (
    <tr onClick={()=>{setModalIssue(true)}}>
      <td>{el['issue-date']}</td>
      <td>{el.date.slice(0,16)}</td>
      <td>{el.location}</td>
      <td>{el.target}</td>
      <td>{el.reporter}</td>
    </tr>
  );
};
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";

export default function AdminUser() {
  const [count, setCount] = useState(100);
  const [page, setPage] = useState(1);

  const dummyData = [{
    "email": "schape0@craigslist.org",
    "nickname": "Chape",
    "hostNum": 1,
    "guestNum": 1
  }, {
    "email": "hbrookton1@mozilla.com",
    "nickname": "Brookton",
    "hostNum": 2,
    "guestNum": 2
  }, {
    "email": "sdelahunty2@discuz.net",
    "nickname": "Delahunty",
    "hostNum": 3,
    "guestNum": 3
  }, {
    "email": "gquinton3@businessinsider.com",
    "nickname": "Quinton",
    "hostNum": 4,
    "guestNum": 4
  }, {
    "email": "cfevers4@infoseek.co.jp",
    "nickname": "Fevers",
    "hostNum": 5,
    "guestNum": 5
  }, {
    "email": "egoater5@sun.com",
    "nickname": "Goater",
    "hostNum": 6,
    "guestNum": 6
  }, {
    "email": "bvanhaeften6@wsj.com",
    "nickname": "Van Haeften",
    "hostNum": 7,
    "guestNum": 7
  }]

  return (
    <div className="adminuser-container">
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
      <table className="table-data">
        <th className="email">이메일</th>
        <th className="nickname">닉네임</th>
        <th className="hostNum">모집 횟수</th>
        <th className="guestNum">매칭 횟수</th>
        <th className="delete"></th>
        {dummyData.length === 0 ? (
          <tr className="box-none">
            <td colSpan="5">일치하는 데이터가 없습니다.</td>
          </tr>
        ) : (
          dummyData.map((el, i) => {
            return <DataRow el={el} key={i} />;
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
    </div>
  );
}

const DataRow = ({ el }) => {
  return (
    <tr>
      <td>{el.email}</td>
      <td>{el.nickname}</td>
      <td>{el.hostNum}</td>
      <td>{el.guestNum}</td>
      <td>
        <FontAwesomeIcon icon={faTrashAlt} className="btn-delete" />
      </td>
    </tr>
  );
};

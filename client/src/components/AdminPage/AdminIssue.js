import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../etc/Loading';
import Pagination from 'react-js-pagination';
import ModalIssue from './ModalIssue';

export default function AdminIssue() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIssue, setModalIssue] = useState(false);
  const [data, setData] = useState([]);
  const [issueData, setIssueData] = useState({});

  const getIssueData = async () => {
    await setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/issue-list`, {
        params: { page },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
    await setIsLoading(false);
  };

  const getIssueDataPage = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/admin/issue-list`, {
        params: { page },
      })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
  };

  useEffect(() => {
    getIssueData();
  }, []);

  useEffect(() => {
    getIssueDataPage();
  }, [page]);

  return (
    <div className='adminissue-container'>
      <table className='table-data'>
        <th className='issue-date'>신고 날짜</th>
        <th className='date'>매칭 일시</th>
        <th className='location'>매칭 장소</th>
        <th className='target'>신고 대상</th>
        <th className='reporter'>신고자</th>
        {isLoading ? (
          <tr className='box-loading'>
            <td colSpan='5'>
              <Loading />
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr className='box-none'>
            <td colSpan='5'>일치하는 데이터가 없습니다.</td>
          </tr>
        ) : (
          data.map((el, i) => {
            return (
              <DataRow
                el={el}
                key={i}
                setModalIssue={setModalIssue}
                setIssueData={setIssueData}
              />
            );
          })
        )}
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
      {modalIssue ? (
        <ModalIssue issueData={issueData} setModalIssue={setModalIssue} />
      ) : (
        ''
      )}
    </div>
  );
}

const DataRow = ({ el, setModalIssue, setIssueData }) => {
  return (
    <tr
      onClick={() => {
        setIssueData(el);
        setModalIssue(true);
      }}
    >
      <td>{el.created_at.slice(0, 10)}</td>
      <td>{el.reserved_at}</td>
      <td>{el.location.place_name}</td>
      <td>{el.target}</td>
      <td>{el.reporter}</td>
    </tr>
  );
};

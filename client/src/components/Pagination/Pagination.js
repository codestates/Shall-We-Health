import './Pagination.css';

const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  paginate,
}) => {
  const pageNumbers = [];
  const totalPage = Math.ceil(totalItemsCount / itemsCountPerPage); //필요한 모든 페이지 페이지 개수
  const maxPage = pageRangeDisplayed; //한번에 보일 수 있는 최대 페이지 개수
  let pages = 0; //필요한 페이지 개수
  if (totalPage < maxPage) {
    pages = totalPage;
  } else {
    pages = maxPage;
  }

  for (let i = 0; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className='pagination-container'>
        <span
          className='first'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={() => {
            activePage > pageRangeDisplayed
              ? paginate(activePage - pageRangeDisplayed)
              : paginate(1);
          }}
        >
          &lt;&lt;
        </span>
        <span
          className='prev'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={() => {
            activePage > 1 ? paginate(activePage - 1) : paginate(activePage);
          }}
        >
          &lt;
        </span>
        <ul className='paging-group'>
          {pageNumbers.map((num) => {
            return (
              <li key={num} className={activePage === num ? 'active' : ''}>
                <span className='paging-num' onClick={() => paginate(num)}>
                  {num}
                </span>
              </li>
            );
          })}
        </ul>
        <span
          className='next'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={() => {
            activePage < totalPage
              ? paginate(activePage + 1)
              : paginate(activePage);
          }}
        >
          &gt;
        </span>
        <span
          className='last'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={() => paginate(totalPage)}
        >
          &gt;&gt;
        </span>
      </div>
    </>
  );
};
export default Pagination;

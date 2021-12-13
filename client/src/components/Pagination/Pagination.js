import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({
  activePage, //현재 페이지
  itemsCountPerPage, //7
  totalItemsCount,
  pageRangeDisplayed, //5
  paginate, //setPage
}) => {
  const pageNumbers = [];
  const totalPage = Math.ceil(totalItemsCount / itemsCountPerPage); //필요한 모든 페이지 페이지 개수

  const startPage =
    Math.floor((activePage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;

  const endPage =
    startPage + pageRangeDisplayed - 1 > totalPage
      ? totalPage
      : startPage + pageRangeDisplayed - 1;
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    activePage > 1 ? paginate(activePage - 1) : paginate(activePage);
  };
  const handleNext = () => {
    activePage < totalPage ? paginate(activePage + 1) : paginate(activePage);
  };

  return (
    <>
      <div className='pagination-container'>
        <span
          className='first'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={() => paginate(1)}
        >
          <FontAwesomeIcon
          icon={faAngleDoubleLeft}/>
        </span>
        <span
          className='prev'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={handlePrev}
        >
          <FontAwesomeIcon
          icon={faAngleLeft}/>
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
          onClick={handleNext}
        >
          <FontAwesomeIcon
          icon={faAngleRight}/>
        </span>
        <span
          className='last'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
          onClick={() => paginate(totalPage)}
        >
          <FontAwesomeIcon
          icon={faAngleDoubleRight}/>
        </span>
      </div>
    </>
  );
};
export default Pagination;

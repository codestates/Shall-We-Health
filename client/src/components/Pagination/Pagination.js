import './Pagination.css';

const Pagination = ({
  //   activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  paginate,
}) => {
  const activePage = 1;
  const pageNumbers = [1, 2, 3, 4, 5];
  for (let i = 0; i <= Math.ceil(totalItemsCount / itemsCountPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className='pagination-container'>
        <span
          className='first'
          style={{ color: '#C4C4C4', fontWeight: 'bold' }}
        >
          &lt;&lt;
        </span>
        <span className='prev' style={{ color: '#C4C4C4', fontWeight: 'bold' }}>
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
        <span className='next' style={{ color: '#C4C4C4', fontWeight: 'bold' }}>
          &gt;
        </span>
        <span className='last' style={{ color: '#C4C4C4', fontWeight: 'bold' }}>
          &gt;&gt;
        </span>
      </div>
    </>
  );
};
export default Pagination;

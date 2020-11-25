import React, { MouseEvent, useEffect, useState } from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { paginationsProps } from './Paginations.d';
import { LIST_MAX_ROWS, PAGINATION } from '../../constants/index';
import ShowRow from './showRow/ShowRow';
import ShowResults from './showResults/ShowResults';
import './Paginations.scss';
import REGEX from 'constants/regex';

const Paginations: React.FC<paginationsProps> = ({ handlePagination, isShowGoTo, totals, isUpdatedData }) => {
  const pages: number[] = [];
  const { t } = useTranslation();
  const defaultPageSize = PAGINATION.DEFAULT_PAGE_SIZE;
  const defaultCurrentPage = PAGINATION.DEFAULT_CURRENT_PAGE;
  const [valueInput, setValue]: any = useState(1);
  const [isChangeGoto, setChangeGoto] = useState(false);
  const [pager, setPager] = useState({
    currentPage: 1,
    pageSize: 15,
    totalItems: 0,
    startPage: 0,
    endPage: 0,
    startIndex: 0,
    totalPages: 0,
    endIndex: 0,
    from: 1,
    to: 15,
    pages
  });
  const [currentSize, setCurrentSize] = useState(15);

  const getPager = (totalItems: number, currentPage: number, pageSize: number) => {
    const newCurrentPage = currentPage || defaultCurrentPage;

    // default page size is 25
    const newPageSize = pageSize || defaultPageSize;
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number = 1;
    let endPage: number = 1;
    if (totalPages <= PAGINATION.NUMBER_OF_NAVIGATION_SHOW) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= PAGINATION.BEGIN_TO_PAGING) {
        startPage = 1;
        endPage = PAGINATION.NUMBER_OF_NAVIGATION_SHOW;
      } else if (currentPage + PAGINATION.UPPER_BOUND >= totalPages) {
        startPage = totalPages - PAGINATION.NUMBER_OF_NAVIGATION_SHOW + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - PAGINATION.LOWER_BOUND;
        endPage = currentPage + PAGINATION.UPPER_BOUND;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let from: number = 1;
    let to: number = pageSize;

    if (currentPage > 1 && currentPage < totalPages) {
      from = pageSize * (currentPage - 1) + 1;
      to = pageSize * currentPage;
    }

    if (currentPage === totalPages) {
      from = pageSize * (currentPage - 1) + 1;
      to = totalItems;
    }
    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage: newCurrentPage,
      pageSize: newPageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
      from,
      to
    };
  };

  const setPage = (page: number) => {
    // get new pager object for specified page
    const newPager = getPager(totals, page, currentSize);

    // update state
    setPager(newPager);
    handlePagination && handlePagination(page, currentSize);
  };

  useEffect(() => {
    if (totals) {
      const newPager = getPager(totals, 1, currentSize);
      setPager(newPager);
      setChangeGoto(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totals, currentSize]);

  useEffect(() => {
    if (isUpdatedData) {
      setPage(1);
      setValue(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatedData]);

  const handlePageClick = (e: MouseEvent, page: number) => {
    e.preventDefault();
    setPage(page);
    setValue(page);
    handlePagination && handlePagination(page, currentSize);
  };

  const handlePreviousClick = (e: MouseEvent) => {
    e.preventDefault();
    setPage(pager.currentPage - 1);
    setValue(pager.currentPage - 1);
    handlePagination && handlePagination(pager.currentPage - 1, currentSize);
  };

  const handleNextClick = (e: MouseEvent) => {
    e.preventDefault();
    setPage(pager.currentPage + 1);
    setValue(pager.currentPage + 1);
    handlePagination && handlePagination(pager.currentPage + 1, currentSize);
  };

  const handleFirstPageClick = (e: MouseEvent) => {
    e.preventDefault();
    setPage(1);
    setValue(1);
    handlePagination && handlePagination(0, currentSize);
  };

  const handleLastPageClick = (e: MouseEvent) => {
    e.preventDefault();
    setPage(pager.totalPages);
    setValue(pager.totalPages);
    handlePagination && handlePagination(pager.totalPages, currentSize);
  };

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!REGEX.DIGIT_ONLY.test(value)) {
      setValue(pager.currentPage);
      return;
    }

    if (Number(value) > pager.totalPages) {
      setPage(pager.totalPages);
      setValue(pager.totalPages);
      handlePagination && handlePagination(pager.totalPages, currentSize);
    }
    if (Number(value) <= 1) {
      setPage(1);
      setValue(1);
      handlePagination && handlePagination(0, currentSize);
    }

    if (Number(value) >= 1 && Number(value) <= pager.totalPages) {
      setValue(value);
      setPage(Number(value));
      handlePagination && handlePagination(Number(value), currentSize);
    }
  };

  const handleToGoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber: number = parseInt(event.target.value, 10);
    setChangeGoto(true);
    pageNumber > pager.totalPages ? setValue(pager.totalPages) : setValue(pageNumber);
  };

  const handleFocus = () => {
    setValue('');
  };
  const paginationItems = pager.pages.map((page: number, i) => (
    <PaginationItem active={page === pager.currentPage} key={i}>
      <PaginationLink onClick={(e) => handlePageClick(e, page)} href="#">
        {page}
      </PaginationLink>
    </PaginationItem>
  ));

  return (
    <div className="paginations-wrapper">
      <div className="show-results-container">
        <ShowRow
          listMaxRows={LIST_MAX_ROWS}
          currentSize={currentSize}
          setCurrentSize={setCurrentSize}
          handlePagination={handlePagination}
        />
        <ShowResults page={pager.currentPage} size={pager.totalPages} />
      </div>
      <div className="paginations-container">
        {isShowGoTo && (
          <div className="go-to-container">
            <p>
              <span>{t('GO_TO')}</span>
            </p>
            <input
              type="number"
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleToGoChange}
              value={isChangeGoto ? valueInput : pager.currentPage}
            />
          </div>
        )}
        <Pagination aria-label="Page navigation example" size="5">
          <PaginationItem disabled={pager.currentPage <= 1} className="first-pagination">
            <PaginationLink first={true} onClick={handleFirstPageClick} href="#">
              <i className="fa fa-fw fa-angle-double-left" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={pager.currentPage <= 1} className="prev-pagination">
            <PaginationLink previous={true} onClick={handlePreviousClick} href="#">
              <i className="fa fa-fw fa-angle-left" />
            </PaginationLink>
          </PaginationItem>
          {paginationItems}
          <PaginationItem disabled={pager.currentPage >= pager.totalPages} className="next-pagination">
            <PaginationLink next={true} onClick={handleNextClick} href="#">
              <i className="fa fa-fw fa-angle-right" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={pager.currentPage >= pager.totalPages} className="last-pagination">
            <PaginationLink last={true} onClick={handleLastPageClick} href="#">
              <i className="fa fa-fw fa-angle-double-right" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};

Paginations.defaultProps = {
  isShowGoTo: true
};

export default Paginations;

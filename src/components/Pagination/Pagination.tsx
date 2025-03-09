import React from 'react';
import PaginationItem from './PaginationItem';

const range = (start: number, end: number): number[] => {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

type PaginationData = {
    pagesCount: number,
    pagesCutCount: number,
    currentPage: number
}
type PagesCut = {
    start: number,
    end: number
}
const getPagesCut = ({ pagesCount, pagesCutCount, currentPage}: PaginationData): PagesCut => {
    const half = Math.floor(pagesCutCount / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(pagesCount, currentPage + half);

    if (start === 1) {
        end = Math.min(pagesCutCount, pagesCount);
    } else if (end === pagesCount) {
        start = Math.max(1, pagesCount - pagesCutCount + 1);
    }

    return { start, end: end + 1 };
}

type PaginationProps = {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    usersCount: number,
    usersPerPage: number
}

const Pagination = ({currentPage, setCurrentPage, usersCount, usersPerPage}: PaginationProps) => {
    const pagesCount: number = Math.ceil(usersCount / usersPerPage);
    const pagesCut = getPagesCut({pagesCount, pagesCutCount: 5, currentPage: currentPage});
    const pages:number[] = range(pagesCut.start, pagesCut.end);
    const isFirstPage:boolean = currentPage === 1;
    const isLastPage:boolean = currentPage === pagesCount;

    return(
        <>
            {pages.length !== 0 && (
                <ul className="pagination">
                    <PaginationItem
                        page='First'
                        currentPage={currentPage}
                        onPageChange={() => setCurrentPage(1)}
                        isDisabled={isFirstPage}
                    />
                    <PaginationItem
                        page='Prev'
                        currentPage={currentPage}
                        onPageChange={() => setCurrentPage(currentPage - 1)}
                        isDisabled={isFirstPage}
                    />
                    {pages.map((page, index) => (
                        <PaginationItem
                            key={index}
                            page={page}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            isDisabled={page === currentPage}
                        />
                    ))}
                    <PaginationItem
                        page='Next'
                        currentPage={currentPage}
                        onPageChange={() => setCurrentPage(currentPage + 1)}
                        isDisabled={isLastPage}
                    />
                    <PaginationItem
                        page='Last'
                        currentPage={currentPage}
                        onPageChange={() => setCurrentPage(pagesCount)}
                        isDisabled={isLastPage}
                    />
                </ul>
            )}
        </>
    );
}

export default Pagination;
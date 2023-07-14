import React from 'react'
import ReactPaginate from 'react-paginate';

const Pagination = (props: any) => {
    return (
        <>
            <ReactPaginate
                pageCount={props.totalPage}
                marginPagesDisplayed={2}
                onPageChange={props.handlePageChange}
                containerClassName={'ListPagination'}
                previousLinkClassName={'page'}
                breakClassName={'page'}
                nextLinkClassName={'page'}
                pageClassName={'page'}
                disabledClassName={'disabled'}
                activeClassName={'active'}
                forcePage={props.currentPage - 1}
            />
        </>
    )
}

export default Pagination
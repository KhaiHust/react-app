import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";


const TablePaginateUser = (props) => {
    const { listUser, handleCLickBtnUpdate, handleClickBtnView, handleClickBtnDel, fetchListUserWithPaginate, pageCount } = props;

    const handlePageClick = (event) => {
        fetchListUserWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <div >
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 &&
                            listUser.map((item, index) => {
                                return (
                                    <tr key={`table-user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button className='btn btn-secondary' onClick={() => handleClickBtnView(item)}>View</button>
                                            <button className='btn btn-warning mx-3' onClick={() => handleCLickBtnUpdate(item)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => handleClickBtnDel(item)}>Delete</button>
                                        </td>
                                    </tr>
                                )

                            })}
                        {listUser && listUser.length === 0 &&
                            <tr>
                                <td colSpan={4}>
                                    Not found data
                                </td></tr>}
                    </tbody>
                </table>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )

}
export default TablePaginateUser;
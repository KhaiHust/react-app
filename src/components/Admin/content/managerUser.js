
import './ManagerUser.scss'
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TablePaginateUser from './TablePaginateUser';

const ManagerUser = () => {
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        //fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);
    const fetchListUser = async () => {
        let res = await getAllUser();

        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);

        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }
    const handleCLickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);

        setDataUpdate(user);
    }
    const resetUpdateDate = () => {
        setDataUpdate({});
    }
    const handleClickBtnView = (user) => {

        setShowModalViewUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnDel = (user) => {
        setShowModalDelete(true);
        setDataDelete(user);
    }
    return (
        <div className="manager-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="user-content ">
                <div className='btn-add-new'>
                    <button className='btn btn-primary' onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add New User</button>
                </div>
                <div className='table-user '>
                    {/* <TableUser listUser={listUser}
                        handleCLickBtnUpdate={handleCLickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDel={handleClickBtnDel} /> */}
                    <TablePaginateUser
                        listUser={listUser}
                        handleCLickBtnUpdate={handleCLickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDel={handleClickBtnDel}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateDate={resetUpdateDate}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    resetUpdateDate={resetUpdateDate}
                    handleCLickBtnUpdate={handleCLickBtnUpdate}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </div>
    )
}
export default ManagerUser;

import './ManagerUser.scss'
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";
import ModalUpdateUser from './ModalUpdateUser';

const ManagerUser = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        fetchListUser();
    }, []);
    const fetchListUser = async () => {
        let res = await getAllUser();

        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }
    const handleCLickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);

        setDataUpdate(user);
    }
    const resetUpdateDate = () => {
        setDataUpdate({});
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
                    <TableUser listUser={listUser}
                        handleCLickBtnUpdate={handleCLickBtnUpdate} />
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUser={fetchListUser} />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateDate={resetUpdateDate}
                />
            </div>
        </div>
    )
}
export default ManagerUser;
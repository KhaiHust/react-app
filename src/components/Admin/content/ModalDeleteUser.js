import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiServices';
import { ToastContainer, toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUser, fetchListUserWithPaginate } = props;

    const handleClose = () => setShow(false);
    const handleConfirm = async () => {
        //const isValidateEmail = validateEmail(dataDelete.email);
        // if (!isValidateEmail) {
        //     toast.error("Invalid email");
        //     return;
        // }
        // if (!deletepassword) {
        //     toast.error("Invalid password");
        //     return;
        // }
        //submit
        let data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            //await fetchListUser();
            props.setCurrentPage(1);
            await fetchListUserWithPaginate(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete User? email = <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalDeleteUser;
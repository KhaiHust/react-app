import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ToastContainer, toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiServices';
const ModalDelQuiz = (props) => {
    const { showDel, setShowDel, dataDelQuiz, fetchQuiz } = props;

    const handleClose = () => setShowDel(false);
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
        let data = await deleteQuiz(dataDelQuiz.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            //await fetchListUser();

            fetchQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>

            <Modal
                show={showDel}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete quiz <b> {dataDelQuiz.name} </b>?
                    {/* <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b> */}
                </Modal.Body>
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


export default ModalDelQuiz;
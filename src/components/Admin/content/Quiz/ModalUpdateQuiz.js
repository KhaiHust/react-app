import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiFilePlus } from 'react-icons/fi';
import _, { update } from 'lodash';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { putUpdateQuiz } from '../../../../services/apiServices';
import { FormLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataQuizUpdate, resetUpdateQuiz, fetchQuiz } = props;


    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setType("");
        setImage("");
        resetUpdateQuiz();
    };
    const handleShow = () => setShow(true);
    const handleUpload = (event) => {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    }



    const handleSubmit = async () => {
        // validate 
        if (!type?.value) {
            toast.error("Loi set Type");
            return;
        }
        //submit
        console.log("check type", type);
        let res = await putUpdateQuiz(dataQuizUpdate.id, description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            fetchQuiz();
        }
        else {
            toast.error(res.EM);
        }

    }
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataQuizUpdate)) {

            setName(dataQuizUpdate.name);
            setDescription(dataQuizUpdate.description);
            setType(dataQuizUpdate.difficulty);

            if (dataQuizUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataQuizUpdate.image}`);
            }
            else setPreviewImage("");
        }
    }, [dataQuizUpdate])

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} >
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size={"xl"} className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <legend className='float-none w-auto px-3'>Add new Quiz</legend>
                    <FloatingLabel
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder='Quiz Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel label="Description">
                        <Form.Control type="text" placeholder="Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} />
                    </FloatingLabel>
                    <div className='my-3'>
                        <Select
                            defaultValue={type}

                            onChange={setType}
                            options={options}
                            placeholder="Quiz Type"
                        />
                    </div>


                    <div className="col-md-12">
                        <label className='form-label label-upload' htmlFor='labelUpload'>
                            <FiFilePlus />
                            Upload File Image</label>
                        <input type="file" hidden id='labelUpload' onChange={(event) => handleUpload(event)} />
                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz;
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import './ManagerQuiz.scss'
import { FormLabel } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { postCreateNewQuiz } from '../../../../services/apiServices';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManagerQuiz = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }

    }
    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error("Loi input");
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="quiz-container">
            <div className="title">
                Manager Quiz
            </div>
            <hr />
            <div className="add-new">

                <fieldset className='border round-3 p-3'>
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


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='mb-1' >Upload Image</Form.Label>
                        <Form.Control type="file"
                            onChange={(event) => handleChangeFile(event)} />
                    </Form.Group>
                    <div>
                        <button className='btn btn-warning mt-3'
                            onClick={() => handleSubmitQuiz()}>Save</button>
                    </div>

                </fieldset>
            </div>
            <div className="quiz-content">
                table
            </div>
        </div>
    )
}
export default ManagerQuiz;
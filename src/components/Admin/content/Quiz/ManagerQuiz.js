import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import './ManagerQuiz.scss'
import { FormLabel } from 'react-bootstrap';
import { useState } from 'react';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManagerQuiz = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);
    const handleChangeFile = () => {

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
                            value={type}
                            // value={selectedOption}
                            // onChange={this.handleChange}
                            options={options}
                            placeholder="Quiz Type"
                        />
                    </div>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='mb-1' >Upload Image</Form.Label>
                        <Form.Control type="file"
                            onChange={(event) => handleChangeFile(event)} />
                    </Form.Group>


                </fieldset>
            </div>
            <div className="quiz-content">
                table
            </div>
        </div>
    )
}
export default ManagerQuiz;
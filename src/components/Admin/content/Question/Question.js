import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import './Questions.scss'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import _ from 'lodash'
const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ])
    // console.log(questions);
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {

            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion]);

        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }
    const handleAddRemoveAnswer = (type, quesID, ansID) => {
        let questionClone = _.cloneDeep(questions);
        if (type === 'ADD') {

            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionClone.findIndex(item => item.id === quesID);

            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);


        }
        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === quesID);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== ansID);
            setQuestions(questionClone);
        }
    }
    const handleOnChage = (type, quesID, value) => {
        let questionClone = _.cloneDeep(questions);
        if (type === 'QUESTION') {
            let index = questionClone.findIndex(item => item.id === quesID);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    }
    const handleOnChageFileQuestion = (quesId, event) => {

        let questionClone = _.cloneDeep(questions);

        let index = questionClone.findIndex(item => item.id === quesId);

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];

            questionClone[index].imageName = event.target.files[0].name;

            setQuestions(questionClone);
        }
    }
    const handleAnswerQuestion = (type, quesId, answerId, value) => {

        let questionClone = _.cloneDeep(questions);

        let index = questionClone.findIndex(item => item.id === quesId);

        if (index > -1) {

            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }



                }
                return answer;
            })
            setQuestions(questionClone);
        }

    }
    const handleSubmitQuestionForQuiz = () => {
        console.log(questions);
    }
    return (
        <div className="question-container">
            <div className="title">
                Manager Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'></div>
                <label>Select Quiz</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={options}
                />
            </div>
            <div className='mt-3 mb-2'>
                Add question:
            </div>
            {
                questions && questions.length > 0
                && questions.map((item, index) => {
                    return (
                        <div key={item.id} className='q-main'>
                            <div className='questions-content'>

                                <FloatingLabel

                                    label={`Question ${index + 1} description`}
                                    className="mb-3 description"
                                >
                                    <Form.Control type="type" placeholder="Description"
                                        value={item.description}
                                        onChange={(event) => handleOnChage('QUESTION', item.id, event.target.value)} />
                                </FloatingLabel>
                                <div className='group-upload'>
                                    <label htmlFor={`${item.id}`} className='label-upload'
                                    ><RiImageAddFill /></label>
                                    <input type={"file"} hidden id={`${item.id}`}
                                        onChange={(event) => handleOnChageFileQuestion(item.id, event)}></input>
                                    <span>{item.imageName ? item.imageName : '0 file is uploaded'}</span>
                                </div>
                                <div className='btn-add'>

                                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                        <AiFillPlusCircle className='icon-add' />
                                    </span>
                                    {questions.length > 1 &&
                                        <span onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}>
                                            <AiFillMinusCircle className='icon-remove' />
                                        </span>
                                    }

                                </div>


                            </div>
                            {
                                item.answers && item.answers.length > 0
                                && item.answers.map((answer, index) => {
                                    return (
                                        <div key={answer.id} className='answers-content'>

                                            <Form.Check
                                                type={'checkbox'}
                                                // checked={answer.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', item.id, answer.id, event.target.checked)}
                                            />


                                            <FloatingLabel

                                                label={`Answer ${index + 1}`}
                                                className="mb-3 answer-name"
                                            >
                                                <Form.Control type="text" placeholder="Answer"
                                                    onChange={(event) => handleAnswerQuestion('INPUT', item.id, answer.id, event.target.value)} />
                                            </FloatingLabel>
                                            <div className='btn-group'>
                                                <span onClick={() => handleAddRemoveAnswer('ADD', item.id)}>
                                                    <AiOutlinePlusCircle className='icon-add' />
                                                </span>
                                                {item.answers.length > 1 && <span onClick={() => handleAddRemoveAnswer('REMOVE', item.id, answer.id)}>
                                                    <AiOutlineMinusCircle className='icon-remove' />
                                                </span>}

                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className='answers-content'>
                                <input className="form-check-input" type="checkbox" value=""
                                />
                                <FloatingLabel

                                    label="Answer 1"
                                    className="mb-3 answer-name"
                                >
                                    <Form.Control type="text" placeholder="Answer" />
                                </FloatingLabel>
                                <div className='btn-group'>
                                    <span>
                                        <AiOutlinePlusCircle className='icon-add' />
                                    </span>
                                    <span>
                                        <AiOutlineMinusCircle className='icon-remove' />
                                    </span>

                                </div>
                            </div> */}

                        </div>
                    )
                })
            }
            {
                questions && questions.length > 0 &&
                <div>
                    <button onClick={() => handleSubmitQuestionForQuiz()} className='btn btn-warning'>Save Questions </button>
                </div>
            }
            {/* <div className='q-main'>
                <div className='questions-content'>

                    <FloatingLabel

                        label="Description"
                        className="mb-3 description"
                    >
                        <Form.Control type="text" placeholder="Description" />
                    </FloatingLabel>
                    <div className='group-upload'>
                        <label htmlFor='fileUpload' className='label-upload'><RiImageAddFill /></label>
                        <input type="file" hidden id='fileUpload'></input>
                        <span>myImage.png</span>
                    </div>
                    <div className='btn-add'>
                        <span>
                            <AiFillPlusCircle className='icon-add' />
                        </span>
                        <span>
                            <AiFillMinusCircle className='icon-remove' />
                        </span>

                    </div>


                </div>
                <div className='answers-content'>
                    <input className="form-check-input" type="checkbox" value=""
                    />
                    <FloatingLabel

                        label="Answer 1"
                        className="mb-3 answer-name"
                    >
                        <Form.Control type="text" placeholder="Answer" />
                    </FloatingLabel>
                    <div className='btn-group'>
                        <span>
                            <AiOutlinePlusCircle className='icon-add' />
                        </span>
                        <span>
                            <AiOutlineMinusCircle className='icon-remove' />
                        </span>

                    </div>
                </div>
                <div className='answers-content'>
                    <input className="form-check-input" type="checkbox" value=""
                    />
                    <FloatingLabel

                        label="Answer 1"
                        className="mb-3 answer-name"
                    >
                        <Form.Control type="text" placeholder="Answer" />
                    </FloatingLabel>
                    <div className='btn-group'>
                        <span>
                            <AiOutlinePlusCircle className='icon-add' />
                        </span>
                        <span>
                            <AiOutlineMinusCircle className='icon-remove' />
                        </span>

                    </div>
                </div>

            </div> */}
        </div >
    )
}
export default Questions;
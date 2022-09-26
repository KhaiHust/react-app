import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import './Questions.scss'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import Lightbox from "react-awesome-lightbox";
import _ from 'lodash'
import { getAllQuizForAdmin, postCreateNewQAnswerForQuestion, postCreateNewQuestionForQuiz } from '../../../../services/apiServices';
const Questions = (props) => {
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
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    })
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - item.description`
                }

            })
            setListQuiz(newQuiz);
        }
    }

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
    const handleSubmitQuestionForQuiz = async () => {
        console.log("check", questions, selectedQuiz);

        //submit question
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value,
                question.description, question.imageFile);
            //submit answer
            await Promise.all(
                question.answers.map(async (answer) => {
                    await postCreateNewQAnswerForQuestion(
                        answer.description, answer.isCorrect, q.DT.id)
                }
                )
            )

        }));

    }
    const handlePreviewImage = (quesId) => {
        let questionClone = _.cloneDeep(questions);

        let index = questionClone.findIndex(item => item.id === quesId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true);
        }
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
                    options={listQuiz}
                />
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
                                        <span >{item.imageName ?
                                            <span onClick={() => handlePreviewImage(item.id)}>{item.imageName}</span> :
                                            '0 file is uploaded'}</span>
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
                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)} />}
            </div>


        </div >
    )
}
export default Questions;
import { useEffect, useState } from "react";
import {
    useParams, useLocation
} from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "../Question/Question";
const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const quizId = params.id;
    const [index, setIndex] = useState(0);
    useEffect(() => {
        fetchQuestions();
    }, [quizId]);
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })

                    // detail.questionId = key;
                    return { questionId: key, answers, questionDescription, image };
                }

                )
                .value()
            setDataQuiz(data);

        }
    }
    const handleBack = () => {
        if (index - 1 < 0) return;
        else setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item =>
            +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    const handleFinish = () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: quizId,
            answers: [],
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {

                let questionId = item.questionId;
                let userAnswerId = [];
                item.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id);
                    }
                })
                answers.push({
                    questionId, userAnswerId
                })

            })
            payload.answers = answers;
            console.log("payload", payload);
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                {/* <div className="q-body">
                    <img />
                </div> */}
                <div className="q-content">
                    <Question index={index} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        handleCheckBox={handleCheckBox} />
                </div>
                <div className="footer d-flex flex-row justify-content-center gap-3">
                    <button className="btn btn-secondary "
                        onClick={() => { handleBack() }}>Back</button>
                    <button className="btn btn-primary "
                        onClick={() => { handleNext() }}>Next</button>
                    <button className="btn btn-warning "
                        onClick={() => { handleFinish() }}>Finish</button>
                </div>

            </div>
            <div className="right-content">
                count down
            </div>
        </div >
    )
}
export default DetailQuiz;
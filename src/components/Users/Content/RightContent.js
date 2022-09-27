import { useRef } from 'react';
import CountDown from './CountDown';
import './RightContent.scss'

const RightContent = (props) => {
    const { dataQuiz } = props;
    const refDiv = useRef([]);
    const onTimeUp = () => {
        props.handleFinish();
    }
    const getClassQuestion = (index, question) => {
        console.log("check index", index, question)
        //check answer
        if (question && question.answers.length > 0) {
            let isUnAnswer = question.answers.find(a => a.isSelected === true);
            if (isUnAnswer) {
                return "question selected"
            }
        }
        return "question"
    }
    const handleClickQuestion = (index, question) => {
        props.setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isUnAnswer = question.answers.find(a => a.isSelected === true);
            if (isUnAnswer) {
                return;
            }

        }

        refDiv.current[index].className = "question clicked"

    }
    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-${index + 1}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</div>
                        )
                    })}


            </div>
        </>
    )
}
export default RightContent;
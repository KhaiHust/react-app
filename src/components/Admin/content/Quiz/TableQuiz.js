import { useEffect } from 'react';
import { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../services/apiServices';
import ModalDelQuiz from './ModalDelQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const TableQuiz = (props) => {
    const { show, setShow, handleClickBtnEdit, dataQuizUpdate, resetUpdateQuiz, handleBtnDelQuiz, showDel, setShowDel, dataDelQuiz, listQuiz, fetchQuiz } = props;
    // const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchQuiz();
        }
        fetchData();
    }, [])
    // const fetchQuiz = async () => {
    //     let res = await getAllQuizForAdmin();
    //     if (res && res.EC === 0) {
    //         setListQuiz(res.DT);
    //     }
    // }

    return (
        <>
            <div>List Quiz</div>
            <div>
                <Table striped bordered hover className='mt-5'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Table</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listQuiz && listQuiz.map((item, index) => {
                            return (<tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td className='d-flex flex-row gap-3'>
                                    <button className='btn btn-warning' onClick={() => handleClickBtnEdit(item)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleBtnDelQuiz(item)}>Delete</button>
                                </td>
                            </tr>)
                        })}


                    </tbody>
                </Table>
                <ModalUpdateQuiz
                    show={show}
                    setShow={setShow}
                    dataQuizUpdate={dataQuizUpdate}
                    resetUpdateQuiz={resetUpdateQuiz}
                    fetchQuiz={fetchQuiz} />
                <ModalDelQuiz
                    showDel={showDel}
                    setShowDel={setShowDel}
                    dataDelQuiz={dataDelQuiz}
                    fetchQuiz={fetchQuiz}
                />
            </div></>
    )
}
export default TableQuiz;
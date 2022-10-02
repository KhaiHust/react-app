import './dashboard.scss'
import { LineChart, Line, BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { getDashboard } from '../../../services/apiServices';
import { useSSR } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
const DashBoard = () => {
    const [dataOverview, setDataOverview] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let res = await getDashboard();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            //process data
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,


                },
                {
                    "name": "Questions",
                    "Qs": Qs,

                },
                {
                    "name": "Answers",
                    "As": As

                }
            ]
            setData(data);
        }

    }
    console.log("check data", dataOverview)
    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users
                                && dataOverview.users.total ? <>{dataOverview.users.total}</> : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuiz ? <>{dataOverview.others.countQuiz}</> : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuestions ? <>{dataOverview.others.countQuestions}</> : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countAnswers ? <>{dataOverview.others.countAnswers}</> : 0}
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={700} height={300} data={data}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            {/* <Tooltip /> */}
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="orange" />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>

        </div>
    )
}
export default DashBoard;
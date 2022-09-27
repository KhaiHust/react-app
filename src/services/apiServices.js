import axios from "../utils/axiosCustomize";
const postCreateUser = (email, password, username, role, image) => {
    //Submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);

}
const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    //Submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);

}
const deleteUser = (userID) => {
    return axios.delete('api/v1/participant', { data: { id: userID } });
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 2000 });
}
const postRegister = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password });
}
const postLogout = (email, refresh_token) => {
    return axios.post('api/v1/register', { email, refresh_token });
}
const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}
const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitAnswer = (data) => {
    console.log("check data", { ...data });
    return axios.post('/api/v1/quiz-submit', { ...data });
}
const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('/api/v1/quiz', data);
}
const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`);
}
const putUpdateQuiz = (id, description, name, difficulty, image) => {
    //Submit data
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('/api/v1/quiz', data);

}
const deleteQuiz = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`);
}
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post('/api/v1/question', data);
}
const postCreateNewQAnswerForQuestion = (description, correct_answer, question_id) => {


    return axios.post('/api/v1/answer', {
        description, correct_answer, question_id
    });
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('/api/v1/quiz-assign-to-user', { quizId, userId });
}
const getQuizWithQA = (quizId) => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`);
}
const postUpserQA = (data) => {
    return axios.post('/api/v1/quiz-upsert-qa', { ...data });
}
export {
    postCreateUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate,
    postLogin, postRegister, postLogout, getQuizByUser, getDataQuiz,
    postSubmitAnswer, postCreateNewQuiz, getAllQuizForAdmin, putUpdateQuiz,
    deleteQuiz, postCreateNewQuestionForQuiz, postCreateNewQAnswerForQuestion,
    postAssignQuiz, getQuizWithQA, postUpserQA
}
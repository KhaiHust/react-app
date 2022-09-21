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
export {
    postCreateUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate,
    postLogin, postRegister, postLogout, getQuizByUser, getDataQuiz,
    postSubmitAnswer
}
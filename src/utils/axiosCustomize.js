import axios from "axios";
import NProgress, { trickle } from "nprogress";
import { store } from '../redux/store'
import { postRefreshToken } from "../services/apiServices";
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});
const getRefeshToken = async (store) => {
    let res = await postRefreshToken(store.getState()?.user?.account?.email, store.getState()?.user?.account?.access_token);
    return res.data.access_token;
}
const instance = axios.create({
    baseURL: 'http://localhost:8081/',

});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // getRefeshToken(store);
    const access_token = store.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async (error) => {
    NProgress.done();
    const originalRequest = error.config;
    if (error.response.EC === -999 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await getRefeshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return instance(originalRequest);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;
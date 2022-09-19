import App from './App';
import User from './components/Users/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';

import ManagerUser from './components/Admin/content/managerUser';
import DashBoard from './components/Admin/content/dashBoard';
import Login from './components/Auth/Login';
import {
    BrowserRouter, Routes,
    Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/Users/ListQuiz';
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>
                <Route path="/admins" element={<Admin />}
                >
                    <Route index element={<DashBoard />} />
                    <Route path="manager-user" element={<ManagerUser />} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
export default Layout
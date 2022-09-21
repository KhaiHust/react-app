import App from './App';
import User from './components/Users/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';

import ManagerUser from './components/Admin/content/managerUser';
import DashBoard from './components/Admin/content/dashBoard';
import Login from './components/Auth/Login';
import {
    BrowserRouter, Routes,
    Route, useParams
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/Users/ListQuiz';
import DetailQuiz from './components/Users/DetailQuiz';
import ManagerQuiz from './components/Admin/content/Quiz/ManagerQuiz';
const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-2'>
            <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
            </main>
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>

                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={<Admin />}
                >
                    <Route index element={<DashBoard />} />
                    <Route path="manager-user" element={<ManagerUser />} />
                    <Route path="manager-quiz" element={<ManagerQuiz />} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route
                    path="*"
                    element={
                        <NotFound />
                    }
                />
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
import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices'
import { ToastContainer, toast } from 'react-toastify';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        //validate

        //submit api

        let data = await postLogin(email, password);
        console.log("check", data);
        // if (data && data.EC === 0) {
        //     toast.success(data.EM);
        //     navigate('/');

        // }
        // if (data && +data.EC !== 0) {
        //     toast.error(data.EM);
        // }
    }
    return (

        <>
            <div className="login-container">
                <div className='header'>
                    <span>Don't have an account yet?</span>
                    <button>Sign up</button>
                </div>
                <div className='title col-4 mx-auto'>
                    Hoi Dan IT
                </div>
                <div className='welcome col-4 mx-auto'>
                    Hello, who’s this?
                </div>
                <div className='content-form col-4 mx-auto'>
                    <form>
                        <div className="form-group">
                            <label className='form-label' >Email</label>
                            <input type="email" className="form-control"

                                value={email} onChange={(event) => setEmail(event.target.value)} />

                        </div>
                        <div className="form-group">
                            <label className='form-label'>Password</label>
                            <input type="password" className="form-control"
                                value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <span>Forgot Password?</span>
                        <br />

                        <button className="btn btn-primary" onClick={() => handleSubmit()}>Login</button>
                        <div className='text-center mt-2 '>
                            <span className='back' onClick={() => { navigate('/') }}>Go to HomePage</span>
                        </div>
                    </form>
                </div>

            </div>
            {/* <button onClick={() => handleSubmit()}>Ấn vào đây</button> */}
        </>
    )
}
export default Login;
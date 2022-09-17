import { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        //validate

        //submit api

        let data = await postLogin(email, password);
        console.log(data);
        if (data && data.EC === 0) {
            dispatch(doLogin)
            toast.success(data.EM);
            navigate('/');

        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (

        <>
            <div className="login-container">
                <div className='header'>
                    <span>Don't have an account yet?</span>
                    <button>
                        <Link className='link-signup' to={"/signup"}>Sign up
                        </Link>
                    </button>
                </div>
                <div className='title col-4 mx-auto'>
                    Hoi Dan IT
                </div>
                <div className='welcome col-4 mx-auto'>
                    Hello, who’s this?
                </div>
                <div className='content-form col-4 mx-auto'>

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

                    <button className="btn btn-primary" type="submit" onClick={() => handleSubmit()}>

                        Login</button>
                    <div className='text-center mt-2 '>
                        <span className='back' onClick={() => { navigate('/') }}>Go to HomePage</span>
                    </div>

                </div>

            </div>
        </>
    )
}
export default Login;
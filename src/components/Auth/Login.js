import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices'
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        //validate
        console.log('Check thu');
        //submit api
        // let res = await postLogin(email, password);
        // console.log(res.EM);
    }
    return (

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
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            placeholder="Enter email"
                            value={email} onChange={(event) => setEmail(event.target.value)} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                            value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <span>Forgot Password?</span>
                    <br />
                    <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>Login</button>
                    <div className='text-center mt-2 '>
                        <span className='back' onClick={() => { navigate('/') }}>Go to HomePage</span>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Login
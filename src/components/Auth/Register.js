import './Register.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify'
import { postRegister } from '../../services/apiServices';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async () => {
        let data = await postRegister(email, username, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');

        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <div className="register-container ">

                <div className="left ">
                    <h1>
                        Sign up
                        <br />
                        and come on in
                    </h1>
                    <img src='https://www.typeform.com/static/signup-page/product-sample-big.png' />
                </div>
                <div className="right ">
                    <div className='header'>
                        <span>Already have an account?</span>
                        <button>
                            <Link to={'/login'} className='link-login'>Login</Link>
                        </button>
                    </div>
                    <div className='title col-4 mx-auto'>
                        Hoi Dan IT
                    </div>
                    <div className='welcome col-4 mx-auto'>
                        Get better data with conversational forms, surveys, quizzes and more.
                    </div>
                    <div className='signup-form col-4 mx-auto'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required
                                value={email} onChange={(event) => setEmail(event.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required
                                value={password} onChange={(event) => setPassword(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter username"
                                value={username} onChange={(event) => setUsername(event.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Tôi đồng ý với các điều khoản." />
                        </Form.Group>
                        <Button className='button' variant="primary" type="submit"
                            onClick={() => handleSignUp()}>
                            Signup
                        </Button>

                    </div>
                </div>

            </div>

        </>
    )
}
export default Register;
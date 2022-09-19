import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { postLogout } from '../../services/apiServices'
const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')

    }
    const handleSignUp = () => {
        navigate('/signup')
    }
    // const handleLogout = async (account) => {

    //     let data = await postLogout(account.email, account.refresh_token);
    //     console.log(account);
    //     if (data && data.EC === 0) {
    //         toast.success(data.EM);
    //         navigate('/');

    //     }
    //     if (data && +data.EC !== 0) {
    //         toast.error(data.EM);
    //     }
    //     navigate('/');
    // }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink className='navbar-brand' to="/">Hoi Dan IT</NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="/users">User</NavLink>
                        <NavLink className='nav-link' to="/admins">Admin</NavLink>

                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn-signup' onClick={() => handleSignUp()}>Sign Up</button>
                            </> :


                            <NavDropdown title="Setting" id="basic-nav-dropdown">

                                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"
                                // onClick={() => handleLogout(account)}
                                >
                                    Logout
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Profile
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;
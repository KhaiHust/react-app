import Sidebar from "./Sidebar";
import './admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';
import Language from "../Header/Language";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content w-100">
                <div className="admin-header d-flex align-items-center justify-content-between px-2">
                    <span className="leftside pe-auto" onClick={() => setCollapsed(!collapsed)}>
                        <FaBars />
                    </span>
                    <div className="rightside d-flex mx-2">
                        <NavDropdown title="Setting" id="basic-nav-dropdown">

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item

                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Language />
                    </div>

                </div>
                <Scrollbars style={{ "height": "100%", "width": "100%" }}>
                    <div className="admin-main">
                        <Outlet />
                    </div>

                </Scrollbars>





            </div>

        </div>
    )
}
export default Admin;
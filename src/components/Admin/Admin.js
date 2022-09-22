import Sidebar from "./Sidebar";
import './admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content w-100">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
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
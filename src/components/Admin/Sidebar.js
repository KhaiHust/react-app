import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { DiReact } from 'react-icons/di'
import { AiFillDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom';

import sidebarBg from '../../assets/bg2.jpg';

const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                rtl={rtl}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span>
                            Hoi Dan IT
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<AiFillDashboard />}
                            suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to="/admins" />
                        </MenuItem>

                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title={"Feature"}
                        >
                            <MenuItem> Quản lí Users
                                <Link to="/admins/manager-user" /></MenuItem>
                            <MenuItem> Quản lí bài quiz</MenuItem>
                            <MenuItem> Quản lí câu hỏi</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/KhaiHust"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Khai Tran
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>

    )
}
export default Sidebar;
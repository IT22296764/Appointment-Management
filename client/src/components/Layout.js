import React, { useState } from 'react';
import '../Layout.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Badge } from 'antd';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Make Appointments',
      path: '/makeappointments',
      icon: 'ri-pencil-line',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'AppManager',
      path: '/appManager',
      icon: 'ri-admin-fill',
    },
  ];

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Appointments List',
      path: '/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Logout',
      path: '/_logout',
      icon: 'ri-logout-box-r-line',
    }
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className="sidebar">
          <div className="sidebar-header">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkv6dg5oDHHjkj_uxHOeYf4jxlEWriGmryV9fmayjbw&s" alt="logo" style={{width:'130px',height:'130px', borderRadius: '100px', marginLeft:'36px'}} />
            <h2 className="text-center text-light font-weight-bold mt-4" >IVORY DENTAL</h2>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={index} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className={`d-flex menu-item`} onClick={() => {
              localStorage.clear();
              navigate('/register');
            }}>
              <i className='ri-logout-circle-line'></i>
              {!collapsed && <Link to='/register'>Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content" style={{ backgroundImage: 'url("https://drkorwin.com/wp-content/uploads/2020/01/Canva-Zircon-dentures-samples-on-a-blue-sheet-with-dental-tools-Ceramic-veneers-lumineers.jpg")' , width: '100%' }}>
          <div className="header">
            {collapsed ? (
              <i className="ri-menu-2-fill  header-action-icon" onClick={() => setCollapsed(false)}></i>
            ) : (
              <i className="ri-close-line  header-action-icon" onClick={() => setCollapsed(true)}></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notification')} />
              <i className="ri-notification-2-line layout-action-icon px-3"></i>
              <Link className="anchor" to='/notification'>Notifications</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

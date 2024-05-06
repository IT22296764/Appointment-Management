import React from 'react'
import { Tabs } from 'antd';
import Layout from "../components/Layout"
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

function Notification() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    

  return (
    <Layout>
        <h1 className="page-title">Notification</h1>
        <Tabs>
            <Tabs.TabPane tab="Unseen" key={0}>
                <div className="d-flex justify-content-end">
                    <h5 className="anchor">Mark all as seen</h5>
                </div>
                {user?.unseenNotifications.map((notification) => (
                    <div className="card p-2" onClick={()=>navigate(notification.onClickpath)}>
                        <div className="card-text">{notification.message}                       
                        </div>
                    </div>
                   
                ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Seen" key={1}>
                <div className="d-flex justify-content-end">
                    <h5 className="anchor" >delete all</h5>
                </div>
                {user?.seenNotifications.map((notification) => (
                    <div className="card p-2" onClick={()=>navigate(notification.onClickpath)}>
                        <div className="card-text">{notification.message}                       
                        </div>
                    </div>
                   
                ))}
                </Tabs.TabPane>            
        </Tabs>
    </Layout>
  )
}

export default Notification;

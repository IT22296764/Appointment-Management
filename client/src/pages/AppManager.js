import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {SearchOutlined} from '@ant-design/icons'
import axios from 'axios';
import { Table, Button, message } from 'antd';

const AppManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
   
    return formattedDate; 
  };

  useEffect(() => {

    const fetchAppointmentsData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/patient/get-appointment");
        setAppointments(response.data);
      } catch (error) {
        message.error("Failed to fetch Appointment data");
        console.error(error);
      }
    };

    fetchAppointmentsData();
  }, []);

  //Handle Search
const handleSearch = async () => {
  const results = appointments.filter(item => item.Name.toLowerCase().includes(searchQuery.toLowerCase()));
  setAppointments(results);
};



  const handleApprove = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3002/api/appManager/${id}/approve`);
      const updatedAppointment = response.data.appointment;
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );
      message.success('Appointment approved successfully');
    } catch (error) {
      console.error('Error approving appointment:', error);
      message.error('Failed to approve appointment. Please try again later.');
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3002/api/appManager/${id}/reject`);
      const updatedAppointment = response.data.appointment;
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );
      message.success('Appointment rejected successfully');
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      message.error('Failed to reject appointment. Please try again later.');
    }

  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleApprove(record._id)} disabled={record.status !== 'pending'}>
            Approve
          </Button>
          <Button onClick={() => handleReject(record._id)} disabled={record.status !== 'pending'}>
            Reject
          </Button>
        </span>
      ),
    },
  ]; 

  return (

    <Layout>
      <h1 className='page-title'>Appointments</h1>
      <div className='search'>
                    <input 
                    className='searchInput'
                    placeholder=' Search by Name'
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{width:"250px",height: "30px",border:"none", boxShadow:"none", borderRadius:'50px' , marginLeft: '15px'}}
                    />
                   <SearchOutlined
                style={{ fontSize: "20px", cursor: "pointer" , padding:"2.5px"}}
                onClick={handleSearch}
            />
                </div>
      <Table 
        columns={columns} 
        dataSource={appointments.map(appointment => ({ ...appointment, key: appointment._id }))} 
      />
    </Layout>
  );
};

export default AppManager;

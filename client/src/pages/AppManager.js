import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { SearchOutlined } from '@ant-design/icons';
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

  const handleSearch = async () => {
    const results = appointments.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAppointments(results);
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await axios.post(`/api/appointment/${id}/${status}`);
      const updatedAppointment = response.data.appointment;
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );
      message.success(`Appointment ${status} successfully`);
    } catch (error) {
      console.error(`Error ${status} appointment:`, error);
      message.error(`Failed to ${status} appointment. Please try again later.`);
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
      title: "Service",
      dataIndex: "service",
      key: "service",
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
          <Button
            type="primary"
            onClick={() => updateAppointmentStatus(record._id, 'approve')}
            disabled={record.status !== 'pending'}
          >
            Approve
          </Button>
          <Button
            onClick={() => updateAppointmentStatus(record._id, 'reject')}
            disabled={record.status !== 'pending'}
          >
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
          style={{
            width: "250px",
            height: "30px",
            border: "none",
            boxShadow: "none",
            borderRadius: '50px',
            marginLeft: '15px'
          }}
        />
        <SearchOutlined
          style={{ fontSize: "20px", cursor: "pointer", padding: "2.5px" }}
          onClick={handleSearch}
        />
      </div>
      <Table
        columns={columns}
        dataSource={appointments.map((appointment) => ({ ...appointment, key: appointment._id }))}
      />
    </Layout>
  );
};

export default AppManager;

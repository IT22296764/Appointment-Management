import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, message, Modal, Form, Button, Input,Select } from "antd";

const Appointments = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);
  const [editForm] = Form.useForm();

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/patient/get-appointment");
        setAppointmentData(response.data);
      } catch (error) {
        message.error("Failed to fetch Appointment data");
        console.error(error);
      }
    };

    fetchAppointmentsData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate; 
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:3002/api/patient/delete-appointment/${record._id}`);
      setAppointmentData((prevData) =>
        prevData.filter((appointment) => appointment._id !== record._id)
      );
      message.success("Appointment deleted successfully");
    } catch (error) {
      message.error("Failed to delete Appointment");
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      const values = await editForm.validateFields();
      
      // Convert the date string to a Date object
      const date = new Date(values.date);
  
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
  
      // Format the date to YYYY-MM-DD 
      values.date = date.toISOString().split('T')[0];
  
      await axios.put(`http://localhost:3002/api/patient/edit-appointment/${editAppointment._id}`, values);
      setEditModalVisible(false);
      message.success("Appointment record updated successfully");
  
      // Refresh the appointment data
      const response = await axios.get("http://localhost:3002/api/patient/get-appointment");
      setAppointmentData(response.data);
    } catch (error) {
      message.error("Failed to update Appointment");
      console.error(error);
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
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <span>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 8 }}
            onClick={() => {
              setEditAppointment(record);
              editForm.setFieldsValue(record);
              setEditModalVisible(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='page-title'>Appointments</h1>
      <Table 
        columns={columns} 
        dataSource={appointmentData.map(appointment => ({ ...appointment, key: appointment._id }))} 
      />

<Modal
  title="Edit Appointment Record"
  open={editModalVisible} 
  onCancel={() => setEditModalVisible(false)}
  footer={[
    <Button key="cancel" onClick={() => setEditModalVisible(false)}>
      Cancel
    </Button>,
    <Button key="edit" type="primary" onClick={handleEdit}>
      Edit
    </Button>, 
  ]} 
>
  <Form form={editForm} layout="vertical">
    <Form.Item
      required
      label="Date"
      name='date'
      rules={[{required: true, message:'Please enter the Date'}]}
    >
      
      <Input/>
    </Form.Item>
    <Form.Item
      name="doctor"
      label="Doctor"
      rules={[{ required: true, message: "Please enter Doctor" }]}
    >
      <Select>
        <Select.Option value="Dr.Anandi">Dr.Anandi</Select.Option>
        <Select.Option value="Dr.Paboda">Dr.Paboda</Select.Option>
        <Select.Option value="Dr.Ema">Dr.Ema</Select.Option>
        <Select.Option value="Dr.Savindi">Dr.Savindi</Select.Option>
      </Select>
    </Form.Item>
  </Form>
</Modal>

    </Layout>
  );
};

export default Appointments;

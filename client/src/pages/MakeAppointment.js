import React, { useState } from 'react';
import Layout from "../components/Layout";
import { Form, Input, Row, Col, DatePicker, Select, Button, message } from 'antd';
import axios from 'axios';

function MakeAppointment() {
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3002/api/patient/add-appointment", values);
            if (response.status === 201) {
                message.success("Appointment added successfully");
            } else {
                message.error("Failed to add appointment. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                if (error.response.status === 404) {
                    message.error("Resource not found. Please check your request.");
                } else {
                    message.error(error.response.data.message || "Failed to add appointment.");
                }
            } else {
                message.error("Failed to add appointment. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
       <Layout>
        <div>
        <h1 className='page-title'>Make Appointments</h1>
        <hr/>
        <h5><i> Working times </i></h5>
            <h6>9.00am-7.00pm from Monday to friday</h6>
            <h6>saturday and other holidays 9.00am-4.00pm only</h6>
            <h6>Closed on Poyaday and Sunday’s </h6>
            
        <Form layout='vertical' onFinish={handleSubmit} >
            <h1 className='card-title mt-3'>Patients' Details</h1>
            <br/>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Full Name" name='Name' rules={[{required: true,message:'Please enter the name',},
                {
                    pattern: /^[a-zA-Z ]+$/g,
                    message: 'Please enter a valid name'
                }
                ]}>
                        <Input placeholder="Full Name"/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Email" name='email' rules={[{required: true,message:'Please enter the email'},{type: 'email',message: 'Please enter a valid email'}]}>
                        <Input placeholder='email'/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Phone Number" name='phoneNumber' rules={[{required: true,message:'Please enter the phone number'},
                {
                    pattern: /^[0-9]{10}$/,
                    message: 'Please enter a valid phone number'
                }
                ]}>
                        <Input placeholder="Phone Number"/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Address" name='address' rules={[{required: true,message:'Please enter the Address'}]}>
                        <Input placeholder="address"/>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Select the Service" name='service' rules={[{required: true,message:'Please Select the service'}]}>
                        <Select>
                            <Select.Option value="Filling teeth">Filling teeth</Select.Option>
                            <Select.Option value="Cleans the teeth">Cleans the teeth</Select.Option>
                            <Select.Option value="Extraction">Extraction</Select.Option>
                            <Select.Option value="Ortho treatment">Ortho treatment</Select.Option>
                            <Select.Option value="Implant treatment">Implant treatment</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Doctor" name='doctor' rules={[{required: true,message:'Please Select the doctor'}]}>
                        <Select>
                            <Select.Option value="Dr.Anandi">Dr.Anandi</Select.Option>
                            <Select.Option value="Dr.Paboda">Dr.Paboda</Select.Option>
                            <Select.Option value="Dr.Ema">Dr.Ema</Select.Option>
                            <Select.Option value="Dr.Savindi">Dr.Savindi</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Date" name='date' rules={[{required: true, message:'Please enter the Date'}]}>
                        <DatePicker />
                    </Form.Item>
                </Col>
                
            </Row>
            <hr/>
            <div className="d-flex justify-content-end">
            <Button className='primary-button' htmlType='submit' loading={loading}>SUBMIT</Button>
            </div> 
        </Form>
        </div>
       </Layout>
    )
}

export default MakeAppointment; 

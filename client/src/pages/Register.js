import { Button, Form, Input } from 'antd';
import React  from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import {useNavigate } from "react-router-dom";
function Register(){
   
    const navigate = useNavigate();

    const onFinish = async(values) => {
        try{
            
            const response = await axios.post('/api/items/add-item', values);
           
            if(response.data.success)
            {
                toast.success('Registered Successfully');
                toast("Redirecting to Appointment");
                navigate("/");
                

            }else{
                toast.error(response.data.message);

            }
        
    }  catch(error){
       
        toast.error('Something went wrong');
    }
}
    return(
        <div className ='authentication'>
            <div className = 'authentication-form card p-3'>
                <h1 className = 'card-title'>Nice To Meet U</h1>
                <Form layout ='vertical' onFinish={onFinish}>
                
                    
                    <Form.Item label ='Name' name = 'name'>
                        <Input placeholder='Name'/>
                    </Form.Item>
                    <Form.Item label ='Email' name = 'email'>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item label ='Password' name = 'password'>
                        <Input placeholder='Password'type='password'/>
                    </Form.Item>
                    <Button className ='primary-button mt-2' htmlType='submit'>REGISTER</Button>
                    </Form>
            
            </div>
        </div>
    )
}

export default Register;
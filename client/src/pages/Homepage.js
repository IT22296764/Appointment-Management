import React, { useEffect,  } from "react";
import Layout from "../components/Layout"
import { useNavigate } from "react-router-dom";
function Homepage() {
   
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
           
        };
 
        fetchData();
    }, []);

    return (
        <Layout>
            
                <div className="welcome">
                <h1><b>Welcome to </b></h1>
                <h1><b>Our Dental Clinic</b></h1>
                <h1><b>Appointment Management System!</b></h1>
                </div>
                   <br/>
                   
                   <div className="article">
                <h6>         Our user-friendly platform is designed </h6>
                <h6>to streamline the appointment management process for patients.</h6>
                <h6>We Have 5 Years Of Experience in Dental Care Service </h6>
                <h6>We Are Ready To help & Take Care Of Your Dental Health</h6>
                
                <div className={`d-flex menu-item`} onClick={() => {
              localStorage.clear();
              navigate('/makeappointments');
            }}><button className="button"><b>Make Appointment</b></button>
                </div>
            </div>
            
            
        </Layout>
    );
}

export default Homepage;

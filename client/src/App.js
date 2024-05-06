import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import AppManager from './pages/AppManager';
import Appointments from './pages/Appointments';
import MakeAppointment from './pages/MakeAppointment';
import Notification from './pages/Notification';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <Router> 
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Homepage is displayed directly under the root route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/makeappointments" element={<MakeAppointment/>} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/appManager" element={<AppManager />} />
        
        
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;

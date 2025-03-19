import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApplicantForm from "./components/applicant/ApplicantForm";
import Applicants from "./components/applicant/applicants";
import ApplicantDetails from "./components/applicant/ApplicantDetails";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import UpdatePassword from "./components/UpdatePassword";
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import setupAxiosInterceptors from './utils/axiosConfig';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TeamMember from './components/team/TeamMember';

function App() {
  useEffect(() => {
    setupAxiosInterceptors();
}, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<ApplicantForm />} />
        <Route path="/muskaan" element={<TeamMember />} />

        {/* Protected Routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/applicants" element={
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        } />
        <Route path="/applicant/:id" element={
          <ProtectedRoute>
            <ApplicantDetails />
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
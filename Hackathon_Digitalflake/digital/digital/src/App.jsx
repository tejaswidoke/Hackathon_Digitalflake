import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/home';
import User from './components/User';
import Role from './components/Role';
import NavBar from './components/NavBAr';
import Signup from './components/createUser';

function App() {


  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/roles" element={<Role />} />
        <Route path="/createUser" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App

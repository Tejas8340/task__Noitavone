import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EndUserDashboard from './components/EndUserDashboard';
import TechSupportDashboard from './components/TechSupportDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/enduser' element={<EndUserDashboard />} />
        <Route path="/techsupport" element={<TechSupportDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Login />
    //   <Register />
    // </div>
  );
}

export default App;

import React from 'react';
// import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import InstituteDashboard from './Components/InstituteDashboard'
import StudentDashboard from './Components/StudentDashboard'
import GovernmentDashboard from './Components/GovernementDashboard';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/institutedashboard' element={<InstituteDashboard/>} />
        <Route path='/studentdashboard' element={<StudentDashboard/>} />
        <Route path='/governementdashboard' element={<GovernmentDashboard/>} />
      </Routes>
    </Router>
    {/* <StudentDashboard/> */}
    </>
  );
}

export default App;

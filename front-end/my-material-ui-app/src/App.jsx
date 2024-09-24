import React from 'react';
// import './App.css';
import StudentSignUp from './Components/StudentSignUp';
// import Login from './Components/login';
import ScholarshipList from './Components/ScholarshipList';
import ScholarshipDetails from './Components/ScholarshipDetails';
import InstituteSignUp from './Components/InstituteSignUp';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import React from 'react';
// import './App.css';
// import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import InstituteDashboard from './Components/InstituteDashboard'
import StudentDashboard from './Components/StudentDashboard'
import GovernmentDashboard from './Components/GovernementDashboard';
// import Test from './Components/Test'

function App() {
  return (
    // <div className="App">
      /* <Login/> */
    // <Signup/> 
      // <InstituteSignUp/>
    // </div>
    // <Router>
    //         <Routes>
    //             <Route path="/" element={<ScholarshipList />} />
    //             <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
    //         </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/register' element={<Signup/>}/> */}
        <Route path='/institutedashboard' element={<InstituteDashboard/>} />
        <Route path='/studentdashboard' element={<StudentDashboard/>} />
        <Route path='/governementdashboard' element={<GovernmentDashboard/>} />
        <Route path='/studentsignup' element={<StudentSignUp/>} />
        <Route path='/institutesignup' element={<InstituteSignUp/>} />
        <Route path='/scholarshiplist' element={<ScholarshipList />} />
        <Route path='/scholarship/:id' element={<ScholarshipDetails />} />
      </Routes>
    </Router>
  );
}

export default App; 

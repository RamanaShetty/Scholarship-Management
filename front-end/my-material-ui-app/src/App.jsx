import React from 'react';
import './App.css';
import Signup from './components/StudentSignUp';
import Login from './components/login';
import ScholarshipList from './components/ScholarshipList';
import ScholarshipDetails from './components/ScholarshipDetails';
import InstituteSignup from './components/InstituteSignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
      /* <Login/> */
    // <Signup/> 
      <InstituteSignup/>
    // </div>
    // <Router>
    //         <Routes>
    //             <Route path="/" element={<ScholarshipList />} />
    //             <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
    //         </Routes>
    // </Router>
  );
}

export default App;

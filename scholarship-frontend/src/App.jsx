import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login.jsx";
import RegistrationForm from "./pages/Registration.jsx";
import StudentPage from "./pages/Student/Student.jsx";
import StudentApplications from "./pages/Student/StudentApplications.jsx";
import ScholarshipDetail from "./components/Student/ScholarshipDetail.jsx";
import GovernmentPage from "./pages/Government/Government.jsx";
import StudentGovApplications from "./pages/Government/Applications.jsx";
import StudentGovApplicationDetail from "./components/Government/GovApplicationCardDetails.jsx";
import Home from "./pages/Home.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/applications" element={<StudentApplications />} />
        <Route path="/gov" element={<GovernmentPage />} />
        <Route path="/gov/applications" element={<StudentGovApplications />} />
        <Route
          path="/gov/applications/:id"
          element={<StudentGovApplicationDetail />}
        />
        <Route path="/scholarship/:id" element={<ScholarshipDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

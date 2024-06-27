import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import LandingPage from "./Components/LandingPage";
import SignInForm from "./Components/SignInForm";
import Footer from "./Components/Footer";
import TaskManagement from "./Components/TaskManagement";
import TaskCalendar from "./Components/TaskCalendar";
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<LandingPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/calendar" element={<TaskCalendar />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

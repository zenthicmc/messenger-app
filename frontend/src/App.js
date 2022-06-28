import './Assets/Css/App.css';
import "./Assets/Css/Utilities.css";
import Navbar from './Components/Navbar';
import AuthNavbar from './Components/AuthNavbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';

function App() {
   return (
      <Router>
         <AuthNavbar />
         <Routes>
            <Route path="/login" element={<Login />} />
         </Routes>
      </Router>
   );
}

export default App;

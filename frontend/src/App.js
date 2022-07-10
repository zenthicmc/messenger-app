import "./Assets/Css/Utilities.css";
import Navbar from './Components/Navbar';
import AuthNavbar from './Components/AuthNavbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register1 from "./Pages/Auth/Register1";
import Register2 from "./Pages/Auth/Register2";
import Register3 from "./Pages/Auth/Register3";

function App() {
   return (
      <Router>
         <AuthNavbar />
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register1 />} />
            <Route path="/register/2" element={<Register2 />} />
            <Route path="/register/3" element={<Register3 />} />
         </Routes>
      </Router>
   );
}

export default App;

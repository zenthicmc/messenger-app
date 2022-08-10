import ChatLogo from '../Assets/Img/chat.png';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../Api/axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import MySwal from "../Utils/sweetalert";

const Navbar = () => {
   const [cookies, removeCookie] = useCookies(["session"]);
   const navigate = useNavigate();

   const Logout = async () => {
      const response = await axios.post("/api/user/logout", {
         refreshToken: CryptoJS.AES.decrypt(
            cookies.session_ga,
            process.env.REACT_APP_HASH_KEY
         ).toString(CryptoJS.enc.Utf8),
      });

      if (response.data.status === "success") {
         MySwal.fire({
            title: "Logout Success",
            text: "You have been logged out",
            icon: "success",
            confirmButtonColor: "#4E426D",
         }).then(() => {
            removeCookie("session");
            removeCookie("session_ga");
            localStorage.removeItem("userid");
            navigate("/login");
         });
      } else {
         console.log(response.data.message);
      }
   };

	return (
      <nav>
         <div className="container">
            <div className="row mt-3">
               <div className="col-lg-8 d-flex mt-2">
                  <Link to="/" className="d-flex brand">
                     <img src={ChatLogo} alt={"logo"} className="logo"></img>
                     <h2 className="ms-3 brand-title">Messenger</h2>
                  </Link>
               </div>
               <div className="col-lg-4 mt-2">
                  <ul className="d-flex justify-content-between list-unstyled p-2">
                     <li>
                        <Link to="/" className="nav-link">
                           HOME
                        </Link>
                     </li>
                     <li>
                        <Link to="/chat" className="nav-link">
                           CHAT
                        </Link>
                     </li>
                     <li>
                        <Link to="/setting" className="nav-link">
                           SETTINGS
                        </Link>
                     </li>
                     <li>
                        <Link to="" className="nav-link">
                           <i className="fa-solid fa-bell"></i>
                        </Link>
                     </li>
                     <li>
                        <button className="nav-link border-0" onClick={Logout}>
                           <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
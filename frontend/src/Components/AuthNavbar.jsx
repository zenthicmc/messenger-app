import "../Assets/Css/Auth.css";
import ChatLogo from "../Assets/Img/chat.png";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
   return (
      <nav>
         <div className="container">
            <div className="row mt-4">
               <div className="col-lg-9 d-flex">
                  <Link to="/" className="d-flex brand">
                     <img src={ChatLogo} alt={"logo"} className="logo"></img>
                     <h2 className="ms-3 brand-title">Messenger</h2>
                  </Link>
               </div>
               <div className="col-lg-3">
                  <ul className="d-flex justify-content-between list-unstyled mt-2 float-end">
                     <li>
                        <Link
                           to="/login"
                           className="button b-primary text-white rounded-5 px-4 me-3"
                        >
                           LOGIN
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/register"
                           className="button b-secondary text-white rounded-5 px-4"
                        >
                           REGISTER
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default AuthNavbar;

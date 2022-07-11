import ChatLogo from '../Assets/Img/chat.png';
import { Link } from "react-router-dom";

const Navbar = () => {
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
                        <Link to="/logout" className="nav-link">
                           <i className="fa-solid fa-right-from-bracket"></i>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
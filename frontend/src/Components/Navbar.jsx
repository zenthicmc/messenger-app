import ChatLogo from '../Assets/Img/chat.png';

const Navbar = () => {
	return (
      <nav>
         <div className="container">
            <div className="row mt-3">
               <div className="col-lg-8 d-flex">
                  <img src={ChatLogo} alt={"logo"} className="logo"></img>
                  <h2 className="ms-3 brand">Messenger</h2>
               </div>
               <div className="col-lg-4">
                  <ul className="d-flex justify-content-between list-unstyled p-2">
                     <li>
                        <a href="" className="nav-link">
                           HOME
                        </a>
                     </li>
                     <li>
                        <a href="" className="nav-link">
                           CHAT
                        </a>
                     </li>
                     <li>
                        <a href="" className="nav-link">
                           SETTINGS
                        </a>
                     </li>
                     <li>
                        <a href="" className="nav-link">
                           <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                     </li>
                     <li>
                        <a href="" className="nav-link">
                           <i class="fa-solid fa-bell"></i>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
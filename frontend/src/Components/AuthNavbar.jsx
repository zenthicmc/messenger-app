import ChatLogo from "../Assets/Img/chat.png";

const AuthNavbar = () => {
   return (
      <nav>
         <div className="container">
            <div className="row mt-4">
               <div className="col-lg-9 d-flex">
                  <img src={ChatLogo} alt={"logo"} className="logo"></img>
                  <h2 className="ms-3 brand">Messenger</h2>
               </div>
               <div className="col-lg-3">
                  <ul className="d-flex justify-content-between list-unstyled mt-2 float-end">
                     <li>
                        <a href="" className="button b-primary text-white rounded-5 px-4 me-3">
                           LOGIN
                        </a>
                     </li>
                     <li>
                        <a href="" className="button b-secondary text-white rounded-5 px-4">
                           REGISTER
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default AuthNavbar;

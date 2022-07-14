import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Link } from "react-router-dom";
import AuthNavbar from "../../Components/AuthNavbar";

const Login = () => {
   const captchaRef = useRef(null);
   const [ token, setToken ] = useState(null);

   const loginCheck = (e) => {
      e.preventDefault();
      if(!token) return
   };

   const handleVerificationSuccess = (token, ekey) => {
      setToken(token.substring(0, 255));
   }; 

   return (
      <div>
         <AuthNavbar />
         <div className="container">
            <div className="row mt-6 mb-5">
               <div className="col-lg-4 bg-white box shadow m-auto rounded-4 p-4">
                  <h4 className="text-center fw-semibold mt-4">
                     Login With Your Account
                  </h4>
                  <form className="mt-5" onSubmit={loginCheck}>
                     <div className="form-group px-3">
                        <label htmlFor="email">Email</label>
                        <input
                           type="email"
                           className="form-input"
                           id="email"
                           autoComplete="off"
                           required
                        />
                     </div>
                     <div className="form-group px-3 mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                           type="password"
                           className="form-input"
                           id="password"
                           autoComplete="off"
                           required
                        />
                     </div>
                     <div className="form-group px-3 mt-4">
                        <HCaptcha
                           sitekey={process.env.REACT_APP_SITE_KEY}
                           onVerify={(token, ekey) =>
                              handleVerificationSuccess(token, ekey)
                           }
                           id="1212"
                        />
                     </div>
                     <div className="form-group px-3 mt-4">
                        <input
                           type="submit"
                           className="button b-primary text-white rounded-3 border-0 w-100"
                           value="Login"
                        />
                     </div>
                     <p className="text-center mt-3">
                        Not yet registered? register
                        <Link to="/register" className="t-secondary">
                           &nbsp;here
                        </Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;

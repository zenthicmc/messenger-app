import { async } from "@firebase/util";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthNavbar from "../../Components/AuthNavbar";
import MySwal from "../../Utils/sweetalert";

const Register1 = () => {
   const navigate = useNavigate();
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const url = process.env.REACT_APP_BACKEND_URL;
   
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
         navigate("/register/2");
      }
   });

   const registerStore = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         MySwal.fire({
            title: "Error",
            text: "Passwords do not match",
            icon: "error",
            confirmButtonColor: "#4E426D",
         });
         return;
      }

      await axios.get(`${url}/api/user/email/${email}`).then(res => {
         if (res.data.status === 'fail') {
            MySwal.fire({
               title: "Error",
               text: "Email already registered",
               icon: "error",
               confirmButtonColor: "#4E426D",
            });
            return false;
         }
         else {
            const data = JSON.stringify({
               firstname: firstname,
               lastname: lastname,
               email: email,
               password: password,
            });

            localStorage.setItem("user", data);
            navigate("/register/2");
         }
      })
   };

   return (
      <div>
         <AuthNavbar />
         <div className="container">
            <div className="row mt-6">
               <div className="col-lg-7 bg-white shadow m-auto rounded-4 p-4 box">
                  <h4 className="text-center fw-semibold mt-4">
                     Register Your Account
                  </h4>
                  <form className="mt-5" onSubmit={registerStore}>
                     <div className="row px-3">
                        <div className="col-lg-6">
                           <label htmlFor="firstname">Firstname</label>
                           <input
                              type="text"
                              className="form-input"
                              id="firstname"
                              autoComplete="off"
                              required
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                           />
                        </div>
                        <div className="col-lg-6">
                           <label htmlFor="lastname">Lastname</label>
                           <input
                              type="text"
                              className="form-input"
                              id="lastname"
                              autoComplete="off"
                              required
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group px-3 mt-3">
                        <label htmlFor="email">Email</label>
                        <input
                           type="email"
                           className="form-input"
                           id="email"
                           autoComplete="off"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                     <div className="row px-3 mt-3">
                        <div className="col-lg-6">
                           <label htmlFor="password">Password</label>
                           <input
                              type="password"
                              className="form-input"
                              id="password"
                              autoComplete="off"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                        <div className="col-lg-6">
                           <label htmlFor="cnfPassword">Confirm Password</label>
                           <input
                              type="password"
                              className="form-input"
                              id="cnfPassword"
                              autoComplete="off"
                              required
                              value={confirmPassword}
                              onChange={(e) =>
                                 setConfirmPassword(e.target.value)
                              }
                           />
                        </div>
                     </div>
                     <div className="form-group px-3 mt-4">
                        <input
                           type="submit"
                           className="button b-primary text-white rounded-3 border-0 w-100"
                           value="Next"
                        />
                     </div>
                     <p className="text-center mt-3">
                        Already registered? login
                        <Link to="/login" className="t-secondary">
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

export default Register1;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthNavbar from "../../Components/AuthNavbar";
import MySwal from "../../Utils/sweetalert";
import axios from "../../Api/axios";

const Register2 = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.username) {
         navigate("/register/3");
      }
   })

   const registerStore = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.get(`/api/user/username/${username}`);
         if (response.data.status === "fail") {
            MySwal.fire({
               title: "Error",
               text: `${response.data.message}`,
               icon: "error",
               confirmButtonColor: "#4E426D",
            });
            return;
         }
         else {
            const user = JSON.parse(localStorage.getItem("user"));
            user.username = username;
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/register/3");
         }
      }
      catch (error) {
         console.log(error);
      }
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
                     <div className="form-group px-3 mt-3">
                        <label htmlFor="username">Enter your username</label>
                        <input
                           type="text"
                           className="form-input"
                           id="username"
                           autoComplete="off"
                           required
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                        />
                        <div id="usernameHelp" className="form-text t-dark">
                           username must be unique, it is used to identify you
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

export default Register2;

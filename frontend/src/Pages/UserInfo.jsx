import Navbar from "../Components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgSelectUser from '../Assets/Img/selectUser.png';
import { useLocation } from "react-router-dom";

const UserInfo = () => {
   const location = useLocation();
   const { id } = location.state;
   const [user, setUser] = useState([]);
	const navigate = useNavigate();

   useEffect(() => {
      if(id) {
         const getUser = async () => {
            const response = await axios.get(`https://dummyjson.com/users/${id}`);
            setUser(response.data);
         }
         getUser();
      } else {
         navigate("/friends");
      }
   }, []);

   return (
      <div>
         <Navbar />
         <div className="container mt-4 mb-5">
            <div className="row justify-content-between">
               <div className="w-100 bg-white shadow rounded-5 m-auto">
                  {user ? (
                     <>
                        <img
                           src={user.image}
                           alt="profile"
                           className="clicked-profile rounded-circle m-auto d-table"
                        />
                        <div className="mt-4">
                           <h5 className="fw-bold text-center spacing-3">
                              {user.firstName} {user.lastName}
                           </h5>
                           <p className="text-center">@{user.username}</p>
                           <div className="w-75 mt-3 m-auto">
                              <p className="text-center t-dark">
                                 Lorem Ipsum is simply dummy text of the
                                 printing and typesetting industry. Lorem Ipsum
                                 has been the industry's standard dummy text
                                 ever{" "}
                              </p>
                           </div>
                        </div>
                        <div className="profile-button-group mt-4 mb-5">
                           <Link to="/chat" className="profile-button b-secondary text-white rounded-3">
                              Chat Now
                           </Link>
                           <Link to="#" className="profile-button b-primary text-white rounded-3">
                              Add Friend
                           </Link>
                        </div>
                     </>
                  ) : (
                     <>
                        <img
                           src={ImgSelectUser}
                           alt="select user"
                           className="w-25 d-table m-auto mt-5"
                        />
                        <h4 className="text-center mt-4 fw-bold">
                           User Not Found
                        </h4>
                        <p className="text-center text-dark mb-5 mt-1">
                           Lorem ipsum, dolor sit amet consectetur adipisicing
                           elit. Doloremque, possimus?
                        </p>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserInfo;

import Navbar from "../Components/Navbar";
import axios from "../Api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgSelectUser from '../Assets/Img/selectUser.png';
import { useLocation } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import { storage } from "../Utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserInfo = () => {
   const loadingContext = useLoadingContext();
   const location = useLocation();
   const { id } = location.state;
   const [user, setUser] = useState([]);
   const [profile, setProfile] = useState([]);
	const navigate = useNavigate();

   setTimeout(() => {
      loadingContext.done();
   }, 500);

   const getDownloadImage = async (img) => {
      await getDownloadURL(ref(storage, `profile/${img}`))
         .then((url) => {
            setProfile(url);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      if(id) {
         const getUser = async () => {
            const response = await axios.get(`/api/user/${id}`);
            setUser(response.data.data);
            getDownloadImage(response.data.data.image);
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
                           src={profile}
                           alt="profile"
                           className="clicked-profile rounded-circle m-auto mt-3 d-table"
                        />
                        <div className="mt-4">
                           <h5 className="fw-bold text-center spacing-3">
                              {user.firstname} {user.lastname}
                           </h5>
                           <p className="text-center">@{user.username}</p>
                           <div className="w-75 mt-3 m-auto">
                              <p className="text-center t-dark">
                                {user.status ? user.status : "No Status"}
                              </p>
                           </div>
                        </div>
                        <div className="profile-button-group mt-4 mb-5">
                           <Link
                              to="/chat"
                              className="profile-button b-secondary text-white rounded-3"
                           >
                              Chat Now
                           </Link>
                           <Link
                              to="/"
                              className="profile-button b-primary text-white rounded-3"
                           >
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

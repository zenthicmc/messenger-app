import Navbar from "../Components/Navbar";
import Contact from "../Components/Contact";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgSelectUser from '../Assets/Img/selectUser.png';
import { useLocation } from "react-router-dom";

const Home = () => {
   const location = useLocation();
   const [users, setUsers] = useState([]);
	const [clickedUser, setClickedUser] = useState({});
   const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

   useEffect(() => {
      const getUsers = async () => {
         await axios
            .get(`https://dummyjson.com/users/search?q=${keyword}`)
            .then((res) => {
               setUsers(res.data.users);
            });
      };
      getUsers();
   }, [keyword]);

   const handleClick = async (e) => {
		await axios.get(`https://dummyjson.com/users/${e.currentTarget.id}`).then((res) => {
			setClickedUser(res.data);
      });
   };

   return (
      <div>
         <Navbar />
         <div className="container mt-4 mb-5">
            <div className="row justify-content-between">
               <div className="w-35 h-15 bg-white shadow rounded-5">
                  <form
                     className="py-2 px-1 d-flex"
                     onSubmit={(e) => e.preventDefault()}
                  >
                     <input
                        type={"text"}
                        className="form-search border-0 ms-1"
                        placeholder="Search..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                     />
                  </form>
               </div>
            </div>
            <div className="row justify-content-between mt-3">
               <div className="contacts w-35 h-95 bg-white shadow rounded-5 p-3">
                  {users.map((user) => (
                     <div
                        key={user.id}
                        id={user.id}
                        className="col"
                        onClick={handleClick}
                     >
                        <Contact
                           img={user.image}
                           name={`${user.firstName} ${user.lastName}`}
                           msg={user.address.address}
                           time={user.bank.cardExpire}
                        />
                     </div>
                  ))}
               </div>
               <div className="w-70 h-95 bg-white shadow rounded-5 position-relative p-4">
                  {clickedUser.id ? (
                     <>
                        <img
                           src={clickedUser.image}
                           alt="profile"
                           className="clicked-profile rounded-circle m-auto d-table mt-4"
                        />
                        <div className="mt-4">
                           <h5 className="fw-bold text-center spacing-3">
                              {clickedUser.firstName} {clickedUser.lastName}
                           </h5>
                           <p className="text-center">
                              @{clickedUser.username}
                           </p>
                           <div className="w-75 mt-3 m-auto">
                              <p className="text-center t-dark">
                                 Lorem Ipsum is simply dummy text of the
                                 printing and typesetting industry. Lorem Ipsum
                                 has been the industry's standard dummy text
                                 ever{" "}
                              </p>
                           </div>
                        </div>
                        <div className="profile-button-group mt-4">
                           <Link
                              to="/chat"
                              className="profile-button b-secondary text-white rounded-3"
                           >
                              Chat Now
                           </Link>
                           <Link
                              to=""
                              className="profile-button b-primary text-white rounded-3"
                           >
                              Add Friend
                           </Link>
                        </div>
                     </>
                  ) : (
                     <>
                        <img src={ImgSelectUser} alt='select user' className="w-50 d-table m-auto mt-5" />
								<h4 className="text-center mt-4">Select A User</h4>
								<p className="text-center text-dark">Please select a user to see their profile & to start chatting</p>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;

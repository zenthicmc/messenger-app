import Navbar from "../Components/Navbar";
import "../Assets/Css/Chat.css";
import "../Assets/Css/Profile.css";
import Contact from "../Components/Contact";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserChats from "./UserChats";

const Chat = () => {
   const [users , setUsers] = useState([]);
   const [keyword , setKeyword] = useState("");
   const [clickedUser , setClickedUser] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const getUsers = async () => {
         await axios.get(`https://dummyjson.com/users/search?q=${keyword}`).then((res) => {
            setUsers(res.data.users); 
         });
      }
      getUsers();
   }, [keyword]);

   const handleClick = async (e) => {
      await axios.get(`https://dummyjson.com/users/${e.currentTarget.id}`).then((res) => {
         setClickedUser(res.data);
      });
   }

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
               <div className="w-70">
                  <div className="row justify-content-between">
                     {clickedUser ? (
                        <>
                           <div className="w-auto bg-white shadow rounded-5 px-4 py-2">
                              <p className="text-center mt-1">
                                 {clickedUser.firstName + clickedUser.lastName}
                              </p>
                           </div>
                           <div className="w-auto bg-white shadow rounded-5 px-4 py-2">
                              <button className="fw-bold t-secondary text-center bg-white border-0 p-1">
                                 Clear Chat
                              </button>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="w-auto bg-white shadow rounded-5 px-4 py-2">
                              <p className="text-center mt-1">
                                 No user selected
                              </p>
                           </div>
                           <div className="w-auto bg-white shadow rounded-5 px-4 py-2">
                              <button className="fw-bold t-secondary text-center bg-white border-0 p-1">
                                 Clear Chat
                              </button>
                           </div>
                        </>
                     )}
                  </div>
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
                  <UserChats userid={clickedUser.id} img={clickedUser.image} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Chat;

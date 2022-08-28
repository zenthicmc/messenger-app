import Navbar from "../Components/Navbar";
import "../Assets/Css/Chat.css";
import "../Assets/Css/Profile.css";
import Contact from "../Components/Contact";
import axios from "../Api/axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import { useLoadingContext } from "react-router-loading";

const Chat = () => {
   const loadingContext = useLoadingContext();
   const [users , setUsers] = useState([]);
   const [keyword , setKeyword] = useState("");
   const [clickedUser , setClickedUser] = useState(false);
   const navigate = useNavigate();

   setTimeout(() => {
      loadingContext.done();
   }, 500);

   useEffect(() => {
      const getUsers = async () => {
         await axios.get(`/api/chat/630915ca8bfe4d74d0ff9cda`).then((res) => {
            console.log(res.data.contacts)
            setUsers(res.data.contacts[0].users)
         });
      }
      getUsers();
   }, [keyword]);

   const handleClick = async (e) => {
      await axios.get(`https://dummyjson.com/users/${e.currentTarget.id}`).then((res) => {
         setClickedUser(res.data);
      });
   }

   const handleForm = (e) => {
      e.preventDefault();
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
                           <button className="w-auto bg-white shadow rounded-5 px-4 border-0">
                              <p className="text-center">
                                 {clickedUser.firstName + clickedUser.lastName}
                              </p>
                           </button>
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
                           name={`${user.firstname} ${user.lastname}`}
                           msg="Lorem Ipsum Dolor"
                           time="19:45"
                        />
                     </div>
                  ))}
               </div>
               <div className="w-70 h-95 bg-white shadow rounded-5 position-relative p-4">
                  <div className="messages d-flex flex-column">
                     <Message
                        sender="true"
                        value="Lorem Ipsum is simply dummy text"
                     />
                     <Message
                        img={clickedUser.image}
                        value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever"
                     />
                     <Message
                        sender="true"
                        value="Lorem Ipsum is simply dummy text"
                     />
                     <Message
                        img={clickedUser.image}
                        value="Lorem Ipsum is simply dummy text"
                     />
                     <Message
                        sender="true"
                        value="Lorem Ipsum is simply dummy text"
                     />
                     <Message
                        img={clickedUser.image}
                        value="Lorem Ipsum is simply dummy text"
                     />
                     <Message
                        img={clickedUser.image}
                        value="Lorem Ipsum is simply dummy text"
                     />
                     <Message
                        sender="true"
                        value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
                     />
                  </div>
                  <div className="input-area w-100">
                     <div className="col-lg-12 mt-2">
                        <form
                           className="w-100 d-flex justify-content-between"
                           onSubmit={handleForm}
                        >
                           <button
                              type="button"
                              className="b-secondary rounded-5 border-0"
                              style={{ width: "50px" }}
                           >
                              <i
                                 className="fa-solid fa-face-grin text-white mt-1"
                                 style={{ fontSize: "22px" }}
                              ></i>
                           </button>
                           <input
                              type="text"
                              name="message"
                              className="form-input rounded-5 px-4 w-75"
                              placeholder="Type a message..."
                              autoComplete="off"
                              style={{ fontSize: "14px" }}
                              required
                           />
                           <button
                              type="button"
                              className="b-secondary rounded-5 border-0"
                              style={{ width: "50px" }}
                           >
                              <i
                                 className="fa-solid fa-paperclip text-white mt-1"
                                 style={{ fontSize: "20px" }}
                              ></i>
                           </button>
                           <button
                              type="submit"
                              className="b-primary me-5 rounded-5 border-0"
                              style={{ width: "50px" }}
                           >
                              <i
                                 className="fa-solid fa-paper-plane text-white mt-1"
                                 style={{ fontSize: "20px" }}
                              ></i>
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Chat;

import Navbar from "../Components/Navbar";
import "../Assets/Css/Chat.css";
import "../Assets/Css/Profile.css";
import Contact from "../Components/Contact";
import axios from "../Api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import { useLoadingContext } from "react-router-loading";
import CryptoJS from "crypto-js";
import Moment from "react-moment";
import Picker from "emoji-picker-react";
import io from "socket.io-client";

const Chat = () => {
   const loadingContext = useLoadingContext();
   const [content , setContent] = useState("");
   const [currentUser, setCurrentUser] = useState({});
   const [users, setUsers] = useState([]);
   const [keyword, setKeyword] = useState("");
   const [clickedUser, setClickedUser] = useState(false);
   const [messages, setMessages] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [showEmojis, setShowEmojis] = useState(false);
   const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

  const addEmoji = (e, emojiObject) => {
      setContent(content + emojiObject.emoji);
      setShowEmojis(false);
  };

   setTimeout(() => {
      loadingContext.done();
   }, 500);

   const UserID = () => {
      if (localStorage.getItem("userid")) {
         return CryptoJS.AES.decrypt(
            localStorage.getItem("userid"),
            process.env.REACT_APP_HASH_KEY
         ).toString(CryptoJS.enc.Utf8);
      } else {
         return false;
      }
   };

   const getCurrentUserLogged = async () => {
      await axios
         .get(`/api/user/${UserID()}`)
         .then((res) => {
            setCurrentUser(res.data.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      const getUsers = async () => {
         await axios.get(`/api/chat/${UserID()}`).then((res) => {
            setUsers(res.data.contacts);
         });
      };
      getUsers();
      const chat = document.getElementById("chat");
      chat.scrollTop = chat.scrollHeight;
   }, [keyword, messages]);

   const getClickedUser = async (userid) => {
      await axios.get(`/api/user/${userid}`).then((res) => {
         setClickedUser(res.data.data);
      }).catch((error) => {
         console.log(error);
      });
   }

   const getMessages = async (chatid) => {
      const messages = await axios.get(`api/message/${chatid}`);
      socket.emit("join", chatid);
      setMessages(messages.data);
      setCurrentChat(chatid);
   } 

   const handleClick = async (e) => {
      e.preventDefault();
      getMessages(e.currentTarget.id);
      getClickedUser(e.currentTarget.getAttribute("clickedid"));
   };

   useEffect(() => {
      getCurrentUserLogged();
   } , []);


   useEffect(() => {
      socket.on("message", function (data) {
         axios.get(`/api/message/${data.chat._id}`).then((res) => {
            setMessages(res.data);
            const chat = document.getElementById("chat");
            chat.scrollTop = chat.scrollHeight;
         }).catch((error) => {
            console.log(error);
         });
      });
   });

   const sendMessagesToSocket = async (data) => {
      socket.emit("sendMessage", currentChat, data);
   }

   const handleForm = async (e) => {
      e.preventDefault();
      const response = await axios.post(`api/message/${currentChat}`, {
         id: UserID(),
         content: content,
      })
      sendMessagesToSocket(response.data);
      setContent("");
      const chat = document.getElementById("chat");
      chat.scrollTop = chat.scrollHeight;
      setMessages([...messages, response.data]);
   };

   return (
      <div onClick={() => showEmojis && setShowEmojis(false)}>
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
                                 {clickedUser.firstname +
                                    " " +
                                    clickedUser.lastname}
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
                  {users.map((user, i) =>
                     user.users[0]._id === `${UserID()}` ? (
                        <div
                           key={i}
                           id={user._id}
                           clickedid={user.users[1]._id}
                           className="col"
                           onClick={handleClick}
                        >
                           <Contact
                              img={user.users[1].image}
                              name={`${user.users[1].firstname} ${user.users[1].lastname}`}
                              msg={user.latestMessage ? user.latestMessage.content : ""}
                              time={
                                 user.latestMessage ? (
                                    <Moment fromNow>
                                       {user.latestMessage.updatedAt}
                                    </Moment>
                                 ) : (
                                    ""
                                 )
                              }
                           />
                        </div>
                     ) : (
                        <div
                           key={i}
                           id={user._id}
                           clickedid={user.users[0]._id}
                           className="col"
                           onClick={handleClick}
                        >
                           <Contact
                              img={user.users[0].image}
                              name={`${user.users[0].firstname} ${user.users[0].lastname}`}
                              msg={user.latestMessage ? user.latestMessage.content : ""}
                              time={
                                 user.latestMessage ? (
                                    <Moment fromNow>
                                       {user.latestMessage.updatedAt}
                                    </Moment>
                                 ) : (
                                    ""
                                 )
                              }
                           />
                        </div>
                     )
                  )}
               </div>
               <div className="w-70 h-95 bg-white shadow rounded-5 position-relative p-4">
                  <div className="messages d-flex flex-column" id="chat">
                     {messages.map((message, i) =>
                        message.sender._id === `${UserID()}` ? (
                           <Message
                              key={i}
                              sender="true"
                              value={message.content}
                              time={
                                 <Moment format="HH:mm">{message.createdAt}</Moment>
                              }
                           />
                        ) : (
                           <Message
                              key={i}
                              img={clickedUser.image}
                              value={message.content}
                              time={
                                 <Moment format="HH:mm">{message.createdAt}</Moment>
                              }
                           />
                        )
                     )}
                  </div>
                  <div className="input-area w-100">
                     <div className="col-lg-12 mt-2">
                        <form
                           className="w-100 d-flex justify-content-between position-relative"
                           onSubmit={handleForm}
                        >
                           <button
                              type="button"
                              className="b-secondary rounded-5 border-0"
                              style={{ width: "50px" }}
                              onClick={() => setShowEmojis(!showEmojis)}
                           >
                              <i
                                 className="fa-solid fa-face-grin text-white mt-1"
                                 style={{ fontSize: "22px" }}
                              ></i>
                           </button>
                           {showEmojis && (
                              <div className="emoji">
                                 <Picker onEmojiClick={addEmoji} />
                              </div>
                           )}
                           <input
                              type="text"
                              name="message"
                              className="form-input rounded-5 px-4 w-75"
                              placeholder="Type a message..."
                              autoComplete="off"
                              style={{ fontSize: "14px" }}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
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

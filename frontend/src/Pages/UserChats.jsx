// sender = true berarti pesan dikirimkan oleh user
// jika sender kosong merupakan pesan yang diterima oleh user
// jika sender kosong maka diperlukan satu props userid, yang berfungsi untuk mengetahui siapa yang mengirim pesan

import Message from "../Components/Message";

const UserChats = (props) => {
   return (
      <>
         <div className="messages d-flex flex-column">
            <Message sender="true" value="Lorem Ipsum is simply dummy text" />
            <Message userid={props.userid} img={props.img} value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever" />
            <Message sender="true" value="Lorem Ipsum is simply dummy text" />
            <Message userid={props.userid} img={props.img} value="Lorem Ipsum is simply dummy text" />
            <Message sender="true" value="Lorem Ipsum is simply dummy text" />
            <Message userid={props.userid} img={props.img} value="Lorem Ipsum is simply dummy text" />
            <Message userid={props.userid} img={props.img} value="Lorem Ipsum is simply dummy text" />
            <Message
               sender="true"
               value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
            />
         </div>
         <div className="input-area w-100">
            <div className="col-lg-12 mt-2">
               <form className="w-100 d-flex justify-content-between">
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
      </>
   );
};

export default UserChats;

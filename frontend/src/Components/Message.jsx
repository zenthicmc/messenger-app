import "../Assets/Css/Message.css";

const Message = (props) => {
   return (
      <div>
         {props.sender ? (
            <div className="message-sender">
               <p className="text-white text-start">{props.value}</p>
               <span className="time">11:00</span>
            </div>
         ) : (
            <div className="d-flex">
               <div className="img-profile mt-2 me-3">
                  <a href="#">
                     <img
                        src="https://picsum.photos/200"
                        className="profile rounded-circle"
                        alt="profile"
                     />
                  </a>
               </div>
               <div className="message-receiver">
                  <p className="text-dark text-start">{props.value}</p>
                  <span className="time">11:00</span>
               </div>
            </div>
         )}
      </div>
   );
};

export default Message;

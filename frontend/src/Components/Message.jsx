import "../Assets/Css/Message.css";

const Message = (props) => {
   return (
      <div>
         {props.sender ? (
            <div className="message-sender">
               <p className="text-white text-start">{props.value}</p>
               <span className="time">{props.time}</span>
            </div>
         ) : (
            <div className="d-flex">
               <div className="message-receiver">
                  <p className="text-dark text-start">{props.value}</p>
                  <span className="time">{props.time}</span>
               </div>
            </div>
         )}
      </div>
   );
};

export default Message;

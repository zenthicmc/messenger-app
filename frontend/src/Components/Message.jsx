import "../Assets/Css/Message.css";
import { Link } from "react-router-dom";

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
                  <Link
                     to={{ pathname: "/" }}
                     className="border-0 bg-white"
                  >
                     <img
                        src={props.img ? props.img : "https://via.placeholder.com/150"}
                        className="profile rounded-circle"
                        alt="profile"
                     />
                  </Link>
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

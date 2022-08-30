import { storage } from "../Utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function truncate(str, no_words) {
   return str.split(" ").splice(0, no_words).join(" ") + "...";
}

const Contact = (props) => {
   const getDownloadImage = (name) => {
      getDownloadURL(ref(storage, `profile/${name}`))
         .then((url) => {
            const img = document.getElementById(name);
            img.setAttribute("src", url);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div>
         <div className="contact w-100 py-2 px-3 mt-1 d-flex">
            <img src={getDownloadImage(props.img)} id={props.img} className="profile" alt="user-img" />
            <div className="col-sm ms-3 mt-1">
               <p>{props.name}</p>
               <p className="t-dark">{truncate(props.msg, 3)}</p>
            </div>
            <div className="d-flex flex-column mt-1">
               <span className="t-dark">{props.time}</span>
               {props.notif
                  ? '<span className="notification ms-4 mt-2"></span>'
                  : ""}
            </div>
         </div>
      </div>
   );
};

export default Contact;

const Contact = (props) => {
   return (
      <div>
         <div className="contact w-100 py-2 px-3 mt-1 d-flex">
            <img src={props.img} className="profile" alt="user-img" />
            <div className="col-sm ms-3 mt-1">
               <p>{props.name}</p>
               <p className="t-dark">{props.msg}</p>
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


import ProfileUpload from "../../Assets/Img/profile.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Register3 = () => {
   const navigate = useNavigate();
   const [profile, setProfile] = useState(ProfileUpload);
   const [image, setImage] = useState(null);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user.profile) {
         navigate("/login");
      }
   });

   const registerStore = (e) => {
      e.preventDefault();
      const data = JSON.parse(localStorage.getItem("user"));
      data.id = nanoid(16); 
      data.profile = image.name;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("image", image);
      localStorage.removeItem("user");
      localStorage.removeItem("image");
      alert("Register Success");
      navigate("/login");
   };

   const inputFile = useRef(null);
   const onClick = (e) => {
      inputFile.current.click();
   };

   const handleFileChange = (e) => {
      const fileObj = e.target.files && e.target.files[0];
      if (!fileObj || !fileObj.type.includes("image")) {
         return;
      }
      setImage(fileObj);
      const fileLocation = URL.createObjectURL(fileObj);
      e.target.value = null;
      setProfile(fileLocation);
   };

   return (
      <div>
         <div className="container mb-5">
            <div className="row mt-5">
               <div className="col-lg-7 bg-white shadow m-auto rounded-4 p-4 box">
                  <h4 className="text-center fw-semibold mt-4">
                     Register Your Account
                  </h4>
                  <form className="mt-5" onSubmit={registerStore}>
                     <div className="profile">
                        <div
                           className="profile-upload"
                           id="profile-upload"
                        >
                           <input
                              type="file"
                              id="file"
                              ref={inputFile}
                              onChange={handleFileChange}
                              className="d-none"
                           />
                           <button
                              type="button"
                              className="border-0 bg-white w-100"
                              onClick={onClick}
                           >
                              <img
                                 src={profile}
                                 alt="imgUpload"
                                 className="profile-img"
                              />
                           </button>
                        </div>
                        <div className="col-lg-7 mt-5 profile-desc">
                           <h4 className="fw-bold">
                              Upload your profile picture
                           </h4>
                           <p className="t-dark">
                              Lorem Ipsum is simply dummy text of the{" "}
                           </p>
                        </div>
                     </div>
                     <div className="form-group px-3 button-upload">
                        <input
                           type="submit"
                           className="button b-primary text-white rounded-3 border-0 w-100"
                           value="Finish"
                        />
                     </div>
                     <p className="text-center mt-3">
                        Already registered? login
                        <Link to="/login" className="t-secondary">
                           &nbsp;here
                        </Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register3;

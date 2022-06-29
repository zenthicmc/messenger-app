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
         <div className="container">
            <div className="row mt-5">
               <div className="col-lg-7 bg-white shadow m-auto rounded-4 p-4">
                  <h4 className="text-center fw-semibold mt-4">
                     Register Your Account
                  </h4>
                  <form className="mt-5" onSubmit={registerStore}>
                     <div className="row justify-content-center">
                        <div
                           className="col-lg-3 profile-upload"
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
                              className="border-0 bg-white"
                              onClick={onClick}
                           >
                              <img
                                 src={profile}
                                 alt="imgUpload"
                                 className="w-100"
                              />
                           </button>
                        </div>
                        <div className="col-lg-6 mt-5">
                           <h4 className="fw-bold">
                              Upload your profile picture
                           </h4>
                           <p className="t-dark">
                              Lorem Ipsum is simply dummy text of the{" "}
                           </p>
                        </div>
                     </div>
                     <div className="form-group px-3 mt-5">
                        <input
                           type="submit"
                           className="button b-primary text-white rounded-3 border-0 w-100"
                           value="Finish"
                        />
                     </div>
                     <p className="text-center mt-2">
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

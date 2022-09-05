import ProfileUpload from "../../Assets/Img/profile.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthNavbar from "../../Components/AuthNavbar";
import { storage } from "../../Utils/firebase";
import { ref, uploadBytes } from 'firebase/storage';
import MySwal from "../../Utils/sweetalert";
import axios from "../../Api/axios";

const Register3 = () => {
   const navigate = useNavigate();
   const [profile, setProfile] = useState(ProfileUpload);
   const [image, setImage] = useState();
   const [imageName, setImageName] = useState(uuid());
   const inputFile = useRef(null);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user.profile) {
         navigate("/login");
      }
   });

   const uploadImage = async () => {
      const imageRef = ref(storage, `profile/${imageName}`);
      await uploadBytes(imageRef, image).then(() => {
         console.log("Uploaded");
      })
   }

   const registerStore = async (e) => {
      e.preventDefault();
      const data = JSON.parse(localStorage.getItem("user"));
      if (!image) {
         return MySwal.fire({
            title: "Error",
            text: "Please upload an image",
            icon: "error",
            confirmButtonColor: "#4E426D",
         });
      };
      uploadImage();

      await axios.post(`/api/user`, {
         username: data.username,
         firstname: data.firstname,
         lastname: data.lastname,
         email: data.email,
         password: data.password,
         image: imageName
      })
      .then(res => {
         localStorage.removeItem("user");
         MySwal.fire({
            title: "Success",
            text: "Account created successfully",
            icon: "success",
            confirmButtonColor: "#4E426D",
         }).then(() => {
            navigate("/login");
         });
      }).catch(err => {
         console.log(err);
      })
   };

   const handleFileChange = (e) => {
      const fileObj = e.target.files && e.target.files[0];
      if (!fileObj || !fileObj.type.includes("image")) {
         return;
      }
      setImage(e.target.files[0]);
      const fileLocation = URL.createObjectURL(fileObj);
      e.target.value = null;
      setProfile(fileLocation);
   };

   return (
      <div>
         <AuthNavbar />
         <div className="container mb-5">
            <div className="row mt-6">
               <div className="col-lg-7 bg-white shadow m-auto rounded-4 p-4 box">
                  <h4 className="text-center fw-semibold mt-4">
                     Register Your Account
                  </h4>
                  <form className="mt-5" onSubmit={registerStore}>
                     <div className="profile-auth">
                        <div className="profile-upload" id="profile-upload">
                           <input
                              type="file"
                              id="file"
                              ref={inputFile}
                              onChange={handleFileChange}
                              className="d-none"
                              name="image"
                           />
                           <button
                              type="button"
                              className="border-0 bg-white w-100"
                              onClick={() => inputFile.current.click()}
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

import Navbar from "../Components/Navbar";
import "../Assets/Css/Setting.css";
import axios from "../Api/axios";
import { v4 as uuid } from "uuid";
import { useEffect, useState, useRef } from "react";
import ProfileUpload from "../Assets/Img/profile.jpg";
import { storage } from "../Utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MySwal from "../Utils/sweetalert";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useLoadingContext } from "react-router-loading";

const Setting = () => {
   const loadingContext = useLoadingContext();
   const [imageName, setImageName] = useState(uuid());
   const [image, setImage] = useState();
   const [profile, setProfile] = useState(ProfileUpload);
   const inputFile = useRef(null);
   const navigate = useNavigate();

   const [firstname, setFirstName] = useState("");
   const [lastname, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [cnfrmPassword, setCnfrmPassword] = useState("");
   const [oldImage, setOldImage] = useState("");

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

   const getDownloadImage = async (img) => {
      await getDownloadURL(ref(storage, `profile/${img}`))
         .then((url) => {
            setProfile(url);
         })
         .catch((error) => {
            console.log(error);
         });
   }

   useEffect(() => {
      const OldData = async () => {
         const OldData = await axios.get(`/api/user/${UserID()}`);
         await getDownloadImage(OldData.data.data.image);
         setFirstName(OldData.data.data.firstname);
         setLastName(OldData.data.data.lastname);
         setEmail(OldData.data.data.email);
         setOldImage(OldData.data.data.image);
      }
      OldData();
   }, [])

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

   const uploadImage = async () => {
      const imageRef = ref(storage, `profile/${imageName}`);
      await uploadBytes(imageRef, image).then(() => {
         console.log("Uploaded");
      });
   };

   const settingStore = async (e) => {
      e.preventDefault();
      if (password !== cnfrmPassword) {
         MySwal.fire({
            title: "Error",
            text: "Password and confirm password does not match",
            icon: "error",
            confirmButtonColor: "#4E426D",
         });
         return;
      }

      const data = {
         firstname: firstname,
         lastname: lastname,
         email: email,
         password: password,
         image: image ? imageName : oldImage,
      };

      const Toast = MySwal.mixin({
         toast: true,
         position: "top-end",
         showConfirmButton: false,
         timer: 3000,
         timerProgressBar: false,
         didOpen: (toast) => {
            toast.addEventListener("mouseenter", MySwal.stopTimer);
            toast.addEventListener("mouseleave", MySwal.resumeTimer);
         },
      });

      if(image) uploadImage();
      const response = await axios.put(`/api/user/${UserID()}`, data);

      if(response.data.status === "success"){
         Toast.fire({
            icon: 'success',
            title: 'Your profile has been updated'
         })
         navigate("/setting");
      } else {
         Toast.fire({
            icon: 'error',
            title: 'Cant Update Your Profile, Something went wrong'
         })
      }
   };

   return (
      <div>
         <Navbar />
         <div className="container mt-4 mb-4">
            <div className="col-lg-12 bg-white shadow rounded-4 px-4 py-5">
               <div className="row">
                  <div className="col-lg-12">
                     <h3 className="text-center fw-bold">
                        Change Your Profile
                     </h3>
                  </div>
                  <form onSubmit={settingStore}>
                     <div
                        className="row justify-content-center mt-5"
                        id="profile-row"
                     >
                        <div className="col-lg-2 me-5 mt-3" id="profile">
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
                              id="profile-btn"
                              onClick={() => inputFile.current.click()}
                           >
                              <img
                                 src={profile}
                                 alt="imgUpload"
                                 className="profile-img"
                              />
                           </button>
                        </div>
                        <div className="col-lg-7">
                           <div className="row mb-2">
                              <div className="col-lg-6">
                                 <label htmlFor="firstname">Firstname</label>
                                 <input
                                    type="text"
                                    className="form-input"
                                    id="firstname"
                                    autoComplete="off"
                                    required
                                    value={firstname}
                                    onChange={(e) =>
                                       setFirstName(e.target.value)
                                    }
                                 />
                              </div>
                              <div className="col-lg-6">
                                 <label htmlFor="lastname">Lastname</label>
                                 <input
                                    type="text"
                                    className="form-input"
                                    id="lastname"
                                    autoComplete="off"
                                    required
                                    value={lastname}
                                    onChange={(e) =>
                                       setLastName(e.target.value)
                                    }
                                 />
                              </div>
                           </div>
                           <div className="row mb-2">
                              <div className="col-lg-12">
                                 <label htmlFor="lastname">Email</label>
                                 <input
                                    type="email"
                                    className="form-input"
                                    id="email"
                                    autoComplete="off"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 />
                              </div>
                           </div>
                           <div className="row mb-2">
                              <div className="col-lg-6">
                                 <label htmlFor="password">Password</label>
                                 <input
                                    type="password"
                                    className="form-input"
                                    id="password"
                                    autoComplete="off"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                       setPassword(e.target.value)
                                    }
                                 />
                              </div>
                              <div className="col-lg-6">
                                 <label htmlFor="cnfrmPassword">
                                    Confirm Password
                                 </label>
                                 <input
                                    type="password"
                                    className="form-input"
                                    id="cnfrmPassword"
                                    autoComplete="off"
                                    required
                                    value={cnfrmPassword}
                                    onChange={(e) =>
                                       setCnfrmPassword(e.target.value)
                                    }
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row mt-5 mb-3">
                        <div className="col-lg-10 m-auto">
                           <input
                              type="submit"
                              className="button b-primary text-white rounded-3 border-0 w-100"
                              value="Update"
                           />
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Setting;

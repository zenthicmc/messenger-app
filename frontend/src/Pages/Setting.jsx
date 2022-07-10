import Navbar from "../Components/Navbar";
import "../Assets/Css/Setting.css";
import Contact from "../Components/Contact";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProfileUpload from "../Assets/Img/profile.jpg";
import { Link } from "react-router-dom";

const Setting = () => {
	const [image, setImage] = useState(null);
	const [profile, setProfile] = useState(ProfileUpload);
	const inputFile = useRef(null);

	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cnfrmPassword, setCnfrmPassword] = useState("");

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
         <Navbar />
         <div className="container mt-4 mb-4">
            <div className="col-lg-12 bg-white shadow rounded-4 px-4 py-5">
               <div class="row">
                  <div class="col-lg-12">
                     <h3 className="text-center fw-bold">
                        Change Your Profile
                     </h3>
                  </div>
                  <form>
							<div class="row justify-content-center mt-5" id="profile-row">
								<div class="col-lg-2 me-5 mt-3" id="profile">
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
										onClick={onClick}
									>
										<img
											src={profile}
											alt="imgUpload"
											className="profile-img"
										/>
									</button>
								</div>
								<div class="col-lg-7">
									<div class="row mb-2">
										<div class="col-lg-6">
											<label htmlFor="firstname">Firstname</label>
											<input
												type="text"
												className="form-input"
												id="firstname"
												autoComplete="off"
												required
												value={firstname}
												onChange={(e) => setFirstName(e.target.value)}
											/>
										</div>
										<div class="col-lg-6">
											<label htmlFor="lastname">Lastname</label>
											<input
												type="text"
												className="form-input"
												id="lastname"
												autoComplete="off"
												required
												value={lastname}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</div>
									</div>
									<div class="row mb-2">
										<div class="col-lg-12">
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
									<div class="row mb-2">
										<div class="col-lg-6">
											<label htmlFor="password">Password</label>
											<input
												type="password"
												className="form-input"
												id="password"
												autoComplete="off"
												required
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div class="col-lg-6">
											<label htmlFor="cnfrmPassword">Confirm Password</label>
											<input
												type="password"
												className="form-input"
												id="cnfrmPassword"
												autoComplete="off"
												required
												value={cnfrmPassword}
												onChange={(e) => setCnfrmPassword(e.target.value)}
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="row mt-5 mb-3">
								<div class="col-lg-10 m-auto">
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

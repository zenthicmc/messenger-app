import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../Api/axios";
import { useLoadingContext } from "react-router-loading";
import { storage } from "../Utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SearchFriends = () => {
	const loadingContext = useLoadingContext();
	const [keyword, setKeyword] = useState("");
	const [users, setUsers] = useState([]);
   const [image, setImage] = useState("");

	setTimeout(() => {
      loadingContext.done();
   }, 400);

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

	useEffect(() => {
		const getUsers = async () => {
         await axios.get(`/api/user?search=${keyword}`).then((res) => {
            setUsers(res.data.users); 
         });
      }
      getUsers();
	}, [keyword])

	return (
      <div>
         <Navbar />
         <div className="container mt-4">
            <div className="row">
               <div className="col-lg-8 bg-white shadow rounded-5 m-auto mt-5 d-flex padding">
                  <span className="mt-2 ms-3">
                     <i
                        className="fa-solid fa-magnifying-glass t-dark"
                        style={{ fontSize: "27px" }}
                     ></i>
                  </span>
                  <form
                     className="d-flex"
                     onSubmit={(e) => e.preventDefault()}
                     style={{ marginTop: "2px" }}
                  >
                     <input
                        type={"text"}
                        className="form-search border-0 ms-1"
                        placeholder="Enter A Username..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                     />
                  </form>
               </div>
            </div>
            <div className="row justify-content-around mt-5 mb-5">
               {users.map((user) => (
                  <div className="card border-0 bg-white shadow rounded-4 mt-4" style={{ width: "26rem" }} key={user._id}>
                     <div className="row">
                        <div className="col-md-3 py-3">
                           <img
                              src={getDownloadImage(user.image)}
                              alt="profile"
                              className="profile-image m-auto d-table rounded-circle"
                              id={user.image}
                           />
                        </div>
                        <div className="col-md-5 mt-3 py-3">
                           <p className="fw-bold profile-text">{`${user.firstname} ${user.lastname}`}</p>
                           <p className="t-dark profile-text">@{user.username}</p>
                        </div>
                        <div className="col-md-4 py-3">
                           <Link to={`/user/${user.username}`} state={{ id: user._id }} className="btn w-100 button-secondary text-white no-hover">
                              <p style={{ fontSize: '14px' }}>See More</p>
                           </Link>
                           <Link to="#" className="btn w-100 button-primary text-white mt-2 no-hover">
                              <p style={{ fontSize: '14px' }}>Add Friend</p>
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default SearchFriends;

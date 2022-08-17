import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../Api/axios";
import { useLoadingContext } from "react-router-loading";

const SearchFriends = () => {
	const loadingContext = useLoadingContext();
	const [keyword, setKeyword] = useState("");
	const [users, setUsers] = useState([]);

	setTimeout(() => {
      loadingContext.done();
   }, 400);

	useEffect(() => {
		const getUsers = async () => {
         await axios.get(`https://dummyjson.com/users/search?q=${keyword}`).then((res) => {
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
                        class="fa-solid fa-magnifying-glass t-dark"
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
            <div class="row justify-content-around mt-5 mb-5">
               {users.map((user) => (
                  <div class="card border-0 bg-white shadow rounded-4 mt-4" style={{ width: "26rem" }}>
                     <div class="row">
                        <div class="col-md-3 py-3">
                           <img
                              src={user.image}
                              alt="profile"
                              className="w-100 m-auto d-table rounded-circle"
                           />
                        </div>
                        <div class="col-md-5 mt-3 py-3">
                           <p className="fw-bold">{`${user.firstName} ${user.lastName}`}</p>
                           <p className="t-dark">@{user.username}</p>
                        </div>
                        <div class="col-md-4 py-3">
                           <Link to={`/user/${user.username}`} state={{ id: user.id }} className="btn w-100 button-secondary text-white no-hover">
                              See More
                           </Link>
                           <Link to="#" className="btn w-100 button-primary text-white mt-2 no-hover">
                              Add Friend
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
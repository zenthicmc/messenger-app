import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../Api/axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

const VerifyToken = () => {
   const [cookies, setCookie, removeCookie] = useCookies(["session"]);
	const [auth, setAuth] = useState(true);
	
	if (!localStorage.getItem("username")) window.location.href = "/login";
	const username = CryptoJS.AES.decrypt(
      localStorage.getItem("username"),
      process.env.REACT_APP_HASH_KEY
   ).toString(CryptoJS.enc.Utf8);

	useEffect(() => {
		const checkToken = async () => {
			const response = await axios.post(`/api/user/verifytoken`, {username: username}, {
				headers: {
					'Authorization': `Bearer ${cookies.session}`,
				},
			});
			if (response.data.status !== "success") {
				try {
               // cek apakah refresh token valid
               const response = await axios.post(`/api/user/refresh`, {
                  refreshToken: CryptoJS.AES.decrypt(cookies.session_ga, process.env.REACT_APP_HASH_KEY).toString(CryptoJS.enc.Utf8),
               });
               if (response.data.status === "success") {
               	setAuth(true);
               	setCookie("session", response.data.data.accessToken, { path: "/" }, { secure: true });
               	console.log("refresh token success");
               }
               else {
               	setAuth(false);
               	removeCookie("session");
               	removeCookie("session_ga");
               }
            }
				catch (error) {
					console.log(error);
					setAuth(false);
				}
			}
			else {
				setAuth(true);
			}
		}
		checkToken();
	}, []);

	return auth;
}

const UseAuth = () => {
   const auth = VerifyToken();
   const location = useLocation();

   return auth ? (
      <Outlet />
   ) : (
      <Navigate to={{ pathname: "/login", state: { from: location } }} />
   );
};

export default UseAuth;

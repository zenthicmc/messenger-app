import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../Api/axios";
import CryptoJS from "crypto-js";
import {useState } from "react";

const UserID = () => {
	if(localStorage.getItem("userid")) {
		return CryptoJS.AES.decrypt(
			localStorage.getItem("userid"),
			process.env.REACT_APP_HASH_KEY
		).toString(CryptoJS.enc.Utf8);
	} else {
		return false;
	}
}

const CheckAccessToken = async (accessToken) => {
	return await axios.post(`/api/user/verifytoken`,{ id: UserID() },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			}
		}
	);
}

const CheckRefreshToken = async (refreshToken) => {
	return await axios.post(`/api/user/refresh`, {
      refreshToken: CryptoJS.AES.decrypt(
         refreshToken,
         process.env.REACT_APP_HASH_KEY
      ).toString(CryptoJS.enc.Utf8),
   });
}

const ClearToken = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["session"]);
	removeCookie("session");
	removeCookie("session_ga");
	localStorage.removeItem("userid");
	window.location.href = "/login";
}

const VerifyToken = () => {
   const [cookies, setCookie, removeCookie] = useCookies(["session"]);
	const [auth, setAuth] = useState(true);

	const checkToken = async () => {
		const access = cookies.session ? await CheckAccessToken(cookies.session) : ClearToken();
		if (access.data.status !== "success") {
			try {
				// cek apakah refresh token valid
				const refresh = cookies.session_ga ? await CheckRefreshToken(cookies.session_ga) : ClearToken();
				if (refresh.data.status === "success") {
               setAuth(true);
               setCookie("session", access.data.data.accessToken,{ path: "/" });
               console.log("refresh token success");
            } else {
					setAuth(false);
              	removeCookie("session");
               removeCookie("session_ga");
               localStorage.removeItem("userid");
					window.location.href = "/login";
					
            }
			} catch (error) {
				console.log(error);
				setAuth(false);
				removeCookie("session");
            removeCookie("session_ga");
            localStorage.removeItem("userid");
				window.location.href = "/login";
			}
		} else {
			setAuth(true);
		}
	};
	checkToken();
	return auth;
}

const UseAuth = () => {
   const auth = UserID() ? VerifyToken() : false;
   const location = useLocation();

   return auth ? (
      <Outlet />
   ) : (
      <Navigate to={{ pathname: "/login", state: { from: location } }} />
   );
};

export default UseAuth;
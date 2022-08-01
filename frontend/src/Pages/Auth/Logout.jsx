import { useEffect } from "react";
import axios from "../../Api/axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import MySwal from "../../Utils/sweetalert";

const Logout = () => {
	const [cookies, removeCookie] = useCookies(["session"]);
	const navigate = useNavigate();

	useEffect(() => {
		const Destory = async () => {
			const response = await axios.post("/api/user/logout", {
				refreshToken: CryptoJS.AES.decrypt(cookies.session_ga, process.env.REACT_APP_HASH_KEY).toString(CryptoJS.enc.Utf8),
			});

			if(response.data.status === "success") {
				MySwal.fire({
					title: "Logout Success",
					text: "You have been logged out",
					icon: "success",
					confirmButtonColor: "#4E426D",
				}).then(() => {
					removeCookie("session");
					removeCookie("session_ga");
					localStorage.removeItem("username");
					navigate("/login");
				});
			}
			else {
				console.log(response.data.message);
			}
		}
		Destory();
	})
};

export default Logout;
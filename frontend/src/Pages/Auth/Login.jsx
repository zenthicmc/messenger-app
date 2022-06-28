import ReCaptchaV2 from 'react-google-recaptcha'

const loginCheck = (e) => {
	e.preventDefault();
	console.log(process.env.SITE_KEY);
}

const Login = () => {
	return (
      <div>
         <div className="container">
            <div className="row mt-5">
               <div className="col-lg-4 bg-white shadow m-auto rounded-4 p-4">
                  <h4 className="text-center fw-semibold mt-4">
                     Login With Your Account
                  </h4>
                  <form className="mt-5" onSubmit={loginCheck}>
                     <div className="form-group px-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-input" id="email" />
                     </div>
                     <div className="form-group px-3 mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                           type="password"
                           className="form-input"
                           id="password"
                        />
                     </div>
                     <div className="form-group px-3 mt-3">
                        {/* <ReCaptchaV2 sitekey={process.env.SITE_KEY} /> */}
                     </div>
                     <div className="form-group px-3 mt-4">
                        <input
                           type="submit"
                           className="button b-primary text-white rounded-3 border-0 w-100"
                           value="Login"
                        />
                     </div>
                     <p className="text-center mt-2">
                        Not yet registered? register{" "}
                        <span className="t-secondary">here</span>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
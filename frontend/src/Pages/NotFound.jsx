import ImgNotFound from '../Assets/Img/notfound.png';

const NotFound = () => {
	return (
      <div>
         <div className="container">
            <div className="row mt-5">
               <div className="col-lg-6 m-auto mt-5">
                  <h3 className="fw-bold t-dark text-center spacing">
                     Page Not Found
                  </h3>
                  <img
                     src={ImgNotFound}
                     alt="not found"
                     className="w-100 mt-3"
                  ></img>
               </div>
            </div>
         </div>
      </div>
   );
}

export default NotFound;
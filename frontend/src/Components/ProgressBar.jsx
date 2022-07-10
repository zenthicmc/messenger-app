import '../Assets/Css/ProgressBar.css';

const ProgressBar = (props) => {
	return (
      <div class="col">
         <ul id="progress-bar" class="progressbar">
            <li class="active">Details</li>
            <li class="active">Address</li>
            <li class="active">add friends</li>
            <li>Confirm</li>
         </ul>
      </div>
   );
}

export default ProgressBar;
import startchat from '../Assets/Img/startchat.png';

const StartChat = () => {
	return (
      <div className="m-auto">
         <img className="start-chat-img" src={startchat} alt="startchat" />
			<div className='start-chat-text w-100 p-3'>
				<h5 className="text-center fw-bold">Select A User To Start Chatting With</h5>
				<p className='text-center t-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis animi temporibus quis, nemo sunt quam?</p>
			</div>
      </div>
   );
}

export default StartChat;
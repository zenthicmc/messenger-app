import startchat from '../Assets/Img/startchat.png';

const StartChat = () => {
	return (
      <div className="m-auto">
         <img className="start-chat-img" src={startchat} alt="startchat" />
			<div className='start-chat-text w-100 p-3'>
				<h5 className="text-center fw-bold">Select A User To Start Conversation</h5>
				
			</div>
      </div>
   );
}

export default StartChat;
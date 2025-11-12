import User from '../assets/user.png';
import './ChatMessage.css';

// This is the component for the messages that would be sent to or by the bot
export function ChatMessage({message, image}){ // props is an JS object which as the key message

  // const message = props.message; You can also write this in a destructured way
  // const {message, image} = props;
  // but we can even destructure it more using {message, image} instead of parameter 'props' in the function defination

  /* We can use if-else statements in JSX syntax using the guard operator
    {sender === "robot" && <img src="robot.png"/>}
    i didn't need to include it here so i made a comment for it*/
  return( // I used a ternary opertor below
    <div className={image === User ? "user-message": "robot-message"}>
      <div className="chat-message">
        { message }
      </div>
      <span><img src={image}/></span>
    </div>
  );
  }
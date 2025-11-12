import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import User from '../assets/user.png'
import Robot from '../assets/robot.png'
import './ChatInput.css'

// This is the component we will use for the input field and the submit button
export function ChatInput({ chatMessages, setChatMessages }){ // we used the export keyword cause we want to use this component ChatInput in other files too
  // Using state to store the user's text
  const [text, setText] = useState('');

  // This is the function to save the input by the user
  function saveInputText(event){ // event is given by default
    setText(event.target.value);
  }

  // This is the function that will allow us to send message to the user
  function sendMessage(){
    /* But we do not have access to the setChatMessages() in this component of ours so we need to lift the state up
      into the parent component so that the child components can also access this state
      here the parent component is App so we will move the state there 
      and then we can access the state by using specific props for every child from the parent component*/
    /* the components the rendered by React when all the code is finished - IT"S IMPORTANT 
      below the two simultaneous update calls for the state results in the first call to be ignored cause the program didn't finish then
      so we will add the things we wanna add for the first call in an element and then use that saved variable into the
      second call instead of ...chatMessages*/
    const newMessage = [
      ...chatMessages,
      {
        message: text,
        image: User,
        id: crypto.randomUUID() // This is a function that creates a unique random 128-bit identifier
      }
    ]

    setChatMessages(newMessage);

    // Getting the response from the chatbot using the external library
    const response = Chatbot.getResponse(text);
    // updating the new reponse from the chatbot into the state
    setChatMessages([
      ...newMessage,
      {
        message: response,
        image: Robot,
        id: crypto.randomUUID()
      }
    ]);

    // removing the entered text by the user in the input field
    setText('');
  }

  return( 
    /* We cannot render two different HTML elements using one return so we use a <div> to group them together
    we can also use a fragmant container like below if we don't wanna add a new div
    The size attribute in input controls how many characters it can store*/
    <div className="input-container">          
        <input 
          placeholder="Send message to the Chatbot" 
          size="30"
          onChange={saveInputText}
          value={text}
          className="inputBar"
        />
        <button
          onClick={sendMessage}
          className=""
        >Send</button>
    </div>
  );
}

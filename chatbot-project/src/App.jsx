import { useState, useRef, useEffect } from 'react'
import { Fragment } from 'react';
import { Chatbot } from 'supersimpledev';
import Robot from './assets/robot.png';
import User from './assets/user.png';
import './App.css'

// This is the component we will use for the input field and the submit button
function ChatInput({ chatMessages, setChatMessages }){
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

// This is the component for the messages that would be sent to or by the bot
function ChatMessage({message, image}){ // props is an JS object which as the key message

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

// This below is a component to store all the props for the final rendering 
function ChatMessages({ chatMessages }){

  /* React has hooks there are basically a way that allows us to insert a react functionality into our components
    The useState() and useEffect() are examples of hooks
    Alsohooks should be used at the top of the statement, also do not use them in conditionals*/

  // we need to get the element we want to scroll to make the effect work
  /* and we cannot use DOM manually inside of react so we will be using anothr hook useRef()
    by this we can create a ref and can store the element inside of this ref*/
  const chatMessagesRef = useRef(null);

  // useEffect() is a web hook that let's us run some code after the component is created or updated
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if(containerElem){
      // scrollTop is how far from the top should we scroll and scrollHeight is total height of the element
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]); 

  /* The array at the end of useEffect if the dependency array it controls when useEffect() runs
    if it's not given then it runs after every render
    it it's empty then it only runs once after the first render
    and it some variable is given then it will run when that variable is changed*/
  
  // This is a test function for event handling
  /*
  function sendMessage(){
    /* .push is an menthod of arrays which let's us add a element at the end 
        there are another methods such as unshift() which can help us add element at the start
        and we can also use the spread operator ...array_name
    setChatMessages([
      ...chatMessages,
      {
        message: "try",
        image: "noimage",
        id: crypto.randomUUID() // This is a function that creates a unique random 128-bit identifier
      }
    ]);
  } 
  */

  return(
    // We are mapping all the key value pairs for every object of the array into a ChatMessage() component so we can directly render it
    // we are providing a ref attribute to our div so that we can have it using useRef()
    <div 
      className="chat-messages-container"
      ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        /* chatMessage references every object we have inside the chatMessages array
            we can change the value of every key inside the object using the referencing we have
            Whenever we insert some array of components React expects us to give each element a unique key*/
        return( // This below inside Fragment we gave it a unique key cause it showerd a warning without it it's used inside map so had too
          <Fragment key={crypto.randomUUID()}>     
            <ChatMessage 
              message={chatMessage.message}
              image={chatMessage.image}
              key={chatMessage.id}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
// This is the component to render the main app
/* {ChatInput()} and <ChatInput></ChatInput> both are same  
Using the second syntax we are kind of creating our own HTML element
we can also write the same thing as <ChatInput /> */

// This is a container to render the ChatInput component. it's the best practise to have one
function App(){
    /* We are using State here
      state let's us store the dynamic data that can change for a component 
      and if the state is changed that specific component will be rendered again
      Also if we want the data inside the state to be updated we need to use the special funtion we get for updating purpose
      if we don't use that and update it simply then the component will not be re-rendered by React
      Also when we try to update the state array ro data we should make a copy first and then update the copy which makes React more efficient*/
      /* What we are trying to do here is make the ChatMessage calling more dynamic by storing the props inside an array of objects inside State*/
    const [chatMessages, setChatMessages] = useState([{
      message: "hello, chatbot",
      image: User,
      id: "id1"
    },{
      message: "Hello! How can I help you?",
      image: Robot,
      id: "id2"
    },{
      message: "What is today's date?",
      image: User,
      id: "id3"
    },{
      message: "Today is Nov 10, And you don't have much time left!",
      image: Robot,
      id: "id4"
    }]);
    // The final return
    return(// The app container needs to stretch till the bottom it's not doing it right now
      <div className="app-container">
        <ChatMessages 
          chatMessages={chatMessages}/> 
        <ChatInput 
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}/>
      </div>
    );
}

export default App

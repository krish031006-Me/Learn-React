import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage'
import { Fragment } from 'react';
import './ChatMessages.css';

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

export default ChatMessages;
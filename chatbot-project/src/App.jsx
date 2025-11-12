import { useState } from 'react'
import { ChatInput } from './components/ChatInput' // This is a named export
import ChatMessages from './components/ChatMessages' // This is default export
import Robot from './assets/robot.png';
import User from './assets/user.png';
import './App.css'

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

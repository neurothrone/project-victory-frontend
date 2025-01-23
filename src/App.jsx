// import './App.css'

import Header from "./components/Header.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputGroup from "./components/InputGroup.jsx";
import {useState} from "react";

function App() {
  const [messages, setMessages] = useState([]);

  function onMessageReceived(message) {
    const newMessage = {
      message: message,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
  }

  return (
    <div className="container d-flex flex-column vh-100">
      <Header/>
      <ChatWindow messages={messages}/>
      <InputGroup onSendMessage={(message) => onMessageReceived(message)}/>
    </div>
  )
}

export default App

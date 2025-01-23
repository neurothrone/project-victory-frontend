// import './App.css'

import Header from "./components/Header.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputGroup from "./components/InputGroup.jsx";
import {useEffect, useState} from "react";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      await loadMessages();
    }
    fetchMessages();
  }, []);



  async function onMessageReceived(message) {
    try {
      const response = await fetch("https://project-victory.azurewebsites.net/api/messages", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: message})
      });

      if (!response.ok) {
        alert("Failed to send message");
        return;
      }

      await loadMessages();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMessages() {
    try {
      const response = await fetch("https://project-victory.azurewebsites.net/api/messages");
      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
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
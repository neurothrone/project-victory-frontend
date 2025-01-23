import Header from "./components/Header.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputGroup from "./components/InputGroup.jsx";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const BASE_API_URL = "https://project-victory.azurewebsites.net";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io(BASE_API_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("message", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      await loadMessages();
    }

    fetchMessages();
  }, []);

  async function onMessageReceived(message) {
    try {
      const response = await fetch(`${BASE_API_URL}/api/messages`, {
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
      const response = await fetch(`${BASE_API_URL}/api/messages`);
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
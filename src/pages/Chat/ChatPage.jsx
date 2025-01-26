import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Header from "../../components/Header.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputGroup from "./components/InputGroup.jsx";

function ChatPage() {
  const [messages, setMessages] = useState([]);

  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;
  // const apiUrl = process.env.VITE_PROD_API_BASE_URL;

  useEffect(() => {
    const socket = io(apiUrl, {
      withCredentials: true,
      query: { username: localStorage.getItem("username") }
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

  async function onSendMessage(message) {
    const username = localStorage.getItem("username") || null;
    if (!username) {
      // TODO: navigate to login page
      return;
    }

    const newMessage = {
      username: username,
      text: message,
    };

    try {
      const response = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newMessage)
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
      const sixHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
      const response = await fetch(`${apiUrl}/api/msg?since=${sixHoursAgo}`);
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
      <InputGroup onSendMessage={(message) => onSendMessage(message)}/>
    </div>
  )
}

export default ChatPage;
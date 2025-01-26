import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Header from "../../components/Header.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputGroup from "./components/InputGroup.jsx";
import {BASE_API_URL} from "../../config.js";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = io(BASE_API_URL, {
      withCredentials: true,
      query: {username: localStorage.getItem("username")}
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
    const username = localStorage.getItem("username");
    const newMessage = {
      username: username,
      text: message,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/api/messages`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newMessage)
      });

      if (!response.ok) {
        alert("Failed to send message");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMessages() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const sixHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
      const response = await fetch(`${BASE_API_URL}/api/msg?since=${sixHoursAgo}`);
      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container d-flex flex-column vh-100">
      <Header/>
      {loading ? (
        <div className="centered-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {messages.length === 0 ? (
            <div className="centered-container">
              <span className="chat-placeholder">No messages yet. Be the first to say something!</span>
            </div>
          ) : <ChatWindow messages={messages}/>}
          <InputGroup onSendMessage={(message) => onSendMessage(message)}/>
        </>
      )}
    </div>
  )
}

export default ChatPage;

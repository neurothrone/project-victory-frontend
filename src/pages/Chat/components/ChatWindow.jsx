import Message from "./Message.jsx";
import {useEffect, useRef} from "react";

function ChatWindow(props) {
  // eslint-disable-next-line react/prop-types
  const {messages} = props;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages]);

  return (
    <main>
      <div id="messages" className="px-3 pt-3 mb-3">
        {messages.length === 0 ?
          <div className="centered-container">
            <span className="chat-placeholder">No messages yet. Be the first to say something!</span>
          </div>
          : messages.map((message) => (
            <Message key={message.timestamp} message={message}/>
          ))
        }
        <div ref={messagesEndRef}/>
      </div>
    </main>
  );
}

export default ChatWindow;

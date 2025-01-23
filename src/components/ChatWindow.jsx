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
        {messages.map((msg) => (
          <Message key={msg.timestamp} msg={msg}/>
        ))}
        <div ref={messagesEndRef}/>
      </div>
    </main>
  );
}

export default ChatWindow;
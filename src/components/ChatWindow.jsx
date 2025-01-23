function ChatWindow(props) {
  // eslint-disable-next-line react/prop-types
  const {messages} = props;

  return (
    <main>
      <div id="messages" className="px-3 pt-3 mb-3">
        {messages.map((msg) => (
          <div key={msg.timestamp} className="message">
            <div className="message-header">
              <span className="username">Username</span>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })}</span>
            </div>
            <div className="message-body">
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ChatWindow;
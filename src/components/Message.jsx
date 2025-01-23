function Message(props) {
  const {msg} = props;

  return (
    <div className="message">
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
  );
}

export default Message;
function Message(props) {
  // eslint-disable-next-line react/prop-types
  const {message} = props;

  return (
    <div className="message">
      <div className="message-header">
        <span className="username">{message.username}</span>
        <span className="timestamp">{new Date(message.timestamp).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })}</span>
      </div>
      <div className="message-body">
        {message.text}
      </div>
    </div>
  );
}

export default Message;
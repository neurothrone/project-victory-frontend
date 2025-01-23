import {useState} from "react";

function InputGroup(props) {
  const [messageInput, setMessageInput] = useState("");
  // eslint-disable-next-line react/prop-types
  const {onSendMessage} = props;

  function clickHandler() {
    const text = messageInput.trim();

    if (!text) {
      alert("Please enter a messaga hajwan");
      return;
    }

    onSendMessage(text);
    setMessageInput("");
  }

  return (
    <div className="input-group mb-3">
      <label htmlFor="messageInput" className="visually-hidden">Message</label>
      <input type="text"
             id="messageInput"
             className="form-control"
             placeholder="Enter your message"
             autoComplete="off"
             tabIndex="1"
             value={messageInput}
             onChange={(e) => setMessageInput(e.target.value)}/>
      <button id="sendButton"
              className="btn"
              tabIndex="2"
              onClick={clickHandler}>
        Send
      </button>
    </div>
  );
}

export default InputGroup;
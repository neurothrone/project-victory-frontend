import {useRef, useState} from "react";

function InputGroup(props) {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);

  // eslint-disable-next-line react/prop-types
  const {onSendMessage} = props;

  function clickHandler() {
    if (!isValidMessage()) {
      alert("Please enter a message");
      return;
    }

    onSendMessage(messageInput.trim());
    setMessageInput("");
    inputRef.current.focus();
  }

  function isValidMessage() {
    return messageInput.trim().length > 0;
  }

  return (
    <div className="input-group mb-3">
      <label htmlFor="messageInput" className="visually-hidden">Message</label>
      <input type="text"
             id="messageInput"
             ref={inputRef}
             className="form-control"
             placeholder="Enter your message"
             autoComplete="off"
             tabIndex="1"
             value={messageInput}
             onChange={(e) => setMessageInput(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === "Enter" && isValidMessage()) {
                 clickHandler();
               }
             }}/>
      <button id="sendButton"
              className="btn"
              tabIndex="2"
              disabled={!isValidMessage()}
              onClick={clickHandler}>
        Send
      </button>
    </div>
  );
}

export default InputGroup;
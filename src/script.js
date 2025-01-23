const messageDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const socketIo = require("socket.io");

const socket = socketIo("https://project-victory.azurewebsites.net/api/messages");
socket.on("message", (message) => {
  console.log("New message received:", message);

  // Update the chat UI with the new message
  const messageElement = document.createElement("div");
  messageElement.textContent = `${message.timestamp}: ${message.message}`;
  messageDiv.appendChild(messageElement);

  // Scroll to the bottom
  scrollToBottom();
});

async function loadMessages() {
  try {
    const response = await fetch("https://project-victory.azurewebsites.net/api/messages");
    const messages = await response.json();

    messageDiv.innerHTML = "";

    messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.innerHTML = `
<div class="message">
  <div class="message-header">
    <span class="username">Username</span>
    <span class="timestamp">${new Date(msg.timestamp).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })}</span>
  </div>
  <div class="message-body">
    ${msg.message}
  </div>
</div>
      `;
      messageDiv.appendChild(messageElement);
    });

    scrollToBottom();
  } catch (error) {
    console.log(error);
  }
}

async function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) {
    alert("Please enter a messaga hajwan");
    return;
  }

  try {
    await fetch("https://project-victory.azurewebsites.net/api/messages", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: text})
    });

    messageInput.value = "";
    await loadMessages();
  } catch (error) {
    console.log(error);
  }
}

function scrollToBottom() {
  messageDiv.scrollTop = messageDiv.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

loadMessages();

import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router';
import ChatPage from "./pages/Chat/ChatPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {BASE_API_URL} from "./config.js";


function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleLogin() {
      if (!username)
        return;

      setLoading(true);

      try {
        const response = await fetch(`${BASE_API_URL}/api/username`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username: username})
        });

        if (!response.ok) {
          const {error} = await response.json();
          alert("An error occurred. Error: " + error);
          handleLoginFailure();
          return;
        }

        const {isTaken} = await response.json();
        if (isTaken) {
          alert("Username is already taken.");
          handleLoginFailure();
          return;
        }

        // User has valid username, store it in local storage
        localStorage.setItem("username", username);
      } catch (error) {
        alert("An error occurred. Error: " + error);
        handleLoginFailure();
      } finally {
        setLoading(false);
      }
    }

    handleLogin();
  }, [username]);

  function handleLoginFailure() {
    localStorage.removeItem("username");
    setUsername(null);
  }

  function hasUsername() {
    return username !== null && username !== "";
  }

  return (
    <BrowserRouter>
      {loading ? (
        <div className="centered-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={hasUsername() ? <Navigate to="/chat"/> : <LoginPage setUsername={setUsername}/>}
          />
          <Route
            path="/chat"
            element={hasUsername() ? <ChatPage username={username}/> : <Navigate to="/"/>}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App

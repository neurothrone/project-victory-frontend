import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router';
import ChatPage from "./pages/Chat/ChatPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";


function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={username ? <Navigate to="/chat"/> : <LoginPage setUsername={setUsername}/>}
        />
        <Route
          path="/chat"
          element={username ? <ChatPage username={username}/> : <Navigate to="/"/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
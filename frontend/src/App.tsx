import { useState } from "react";
// COMPONENTS
import Messages from "./components/Messages/Messages";
import Username from "./components/Username/Username";

// STYLES
import "./App.css";

function App() {
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  return (
    <div className="App">
      <h1>Your Messages will appear below</h1>
      {!showMessages && (
        <Username
          userName={userName}
          setUserName={setUserName}
          setShowMessages={setShowMessages}
        />
      )}
      {showMessages && <Messages userName={userName} />}
    </div>
  );
}

export default App;

import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";

export default function Home() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  console.log(loggedIn);

  return (
    <div>
      <div className={`relative ${showLogin ? "opacity-50" : ""}`}>
        <Header onClick={handleLoginClick} loggedIn={loggedIn} />
        <Main />
      </div>

      {showLogin && (
        <Login setShowLogin={setShowLogin} setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Login from "./login";
import { auth } from "./firebase";
import Main from "./mainpage"
import "./App.css"
 
function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName); // Corrected function name
      } else {
        setUserName("");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {/* Pass the userName as a prop to the Home component */}
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/sign" element={<Signup />} />
          <Route path="/log" element={<Login />} />
          <Route path = "/main" element = {<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

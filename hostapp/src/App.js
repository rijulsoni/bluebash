import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

const ChatApp = lazy(() => import("chatApp/ChatApp"));
// const EmailApp = lazy(() => import("emailApp/EmailApp"));

function App() {
  // const [showNotification, setShowNotification] = useState("");

  // useEffect(() => {
  //   const handleEmailSent = (event) => {
  //     setShowNotification(`📧 Email sent to: ${event.detail.to}`);
  //   };

  //   window.addEventListener("email-sent", handleEmailSent);

  //   return () => {
  //     window.removeEventListener("email-sent", handleEmailSent);
  //   };
  // }, []);

  return (
    <Router>
      <div>
        <h1>Main Application</h1>

        {/* {showNotification && <div className="notification">{showNotification}</div>} */}

        <nav>
          <ul>
            <li>
              <Link to="/chat">Chat App</Link>
            </li>
            {/* <li>
              <Link to="/email">Email App</Link>
            </li> */}
          </ul>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/chat" element={<ChatApp />} />
            {/* <Route path="/email" element={<EmailApp />} /> */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

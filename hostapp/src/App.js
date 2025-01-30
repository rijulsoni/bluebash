import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

const ChatApp = lazy(() => import("chatApp/ChatApp"));
const EmailApp = lazy(() => import("emailApp/EmailApp"));

function App() {
  return (
    <Router>
      <div>
        <h1>Main Application</h1>
        <nav>
          <ul>
            <li>
              <Link to="/chat">Chat App</Link>
            </li>
            <li>
              <Link to="/email">Email App</Link>
            </li>
          </ul>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/email" element={<EmailApp />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

# Micro-Frontend Chat & Email Application

## Overview
This project is a modular application that combines chat and email functionality using **Webpack Module Federation**. It demonstrates micro-frontend architecture, allowing independent development and deployment of the chat and email modules while integrating them into a single host application.

---

## Project Structure
The project is organized into the following directories:

```
├── api/               # Backend server (Express + Socket.IO)
├── chatapp/           # Chat micro-frontend
├── emailapp/          # Email micro-frontend
└── hostapp/           # Host application (integrates chat and email apps)
```

---

## Tech Stack
- **Frontend**: React 19, Webpack 5 Module Federation
- **Backend**: Express.js, Socket.IO, NodeMailer
- **Runtime**: Node.js v16+
- **Package Manager**: npm v8+

---

## Prerequisites
Before getting started, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (for cloning the repository)

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rijulsoni/bluebash.git
cd assignment
```

### 2. Install Dependencies
Navigate to each directory and install the required dependencies:

```bash
# API
cd api && npm install

# Chat App
cd ../chatapp && npm install

# Email App
cd ../emailapp && npm install

# Host App
cd ../hostapp && npm install
```

### 3. Configure Local Development

#### Update API CORS Settings
Modify the CORS settings in the API server to allow connections from the frontend applications:

```javascript
// filepath: api/server.js
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3000'],
    methods: ['GET', 'POST']
}));
```

#### Update Host App Webpack Configuration
Ensure the host app is configured to load the chat and email micro-frontends:

```javascript
// filepath: hostapp/webpack.config.js
remotes: {
    chatApp: "chatApp@http://localhost:3001/remoteEntry.js",
    emailApp: "emailApp@http://localhost:3002/remoteEntry.js"
}
```

### 4. Start Development Servers
Open multiple terminal windows to run the servers simultaneously:

```bash
# Terminal 1 - API (Port 5001)
cd api && npm start

# Terminal 2 - Chat App (Port 3001)
cd ../chatapp && npm start

# Terminal 3 - Email App (Port 3002)
cd ../emailapp && npm start

# Terminal 4 - Host App (Port 3000)
cd ../hostapp && npm start
```

Once all servers are running, access the application at:
- **Host App**: [http://localhost:3000](http://localhost:3000)
- **Chat App**: [http://localhost:3001](http://localhost:3001)
- **Email App**: [http://localhost:3002](http://localhost:3002)

---

## API Endpoints

### Chat
- **WebSocket Connection**: `ws://localhost:5001`

#### Events:
- `connection`: Triggered when a new user connects.
- `message`: Used to send and receive chat messages.
- `disconnect`: Triggered when a user disconnects.

### Email
- **POST** `/send-email`

#### Request Body:
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "message": "Email content"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Production Deployment
The application is currently deployed using the following services:

- **Frontend (Host App)**: [https://hostappmain.netlify.app](https://hostappmain.netlify.app)
- **Backend (API)**: [https://bluebash.onrender.com](https://bluebash.onrender.com)

---

## Implementation Details
This project uses **Webpack Module Federation** to enable micro-frontend architecture. Each micro-frontend (chat and email) is developed and deployed independently, while the host application dynamically loads these modules at runtime. The backend API handles real-time chat functionality via **Socket.IO** and email sending via **NodeMailer**.

---

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---



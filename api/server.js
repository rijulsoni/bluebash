const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sonirijul1@gmail.com',
      pass: 'meza qkmi anzl qvkr'
    }
  });

  app.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body;
    console.log('Request body: ', req.body);

    const mailOptions = {
      from: 'sonirijul1@gmail.com',
      to: to || 'default-recipient@example.com',
      subject: subject || 'Hello from Node.js!',
      text: body || 'This is a test email sent from a Node.js application.',
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).send({ message: 'Error sending email', error });
    }
  });


const io = socketIo(server, {
  cors: {
    origin: ['https://chatappmain12.netlify.app/', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});




io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});

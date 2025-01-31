import React, { useState } from 'react';

const SendEmail = () => {
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSend = async () => {
    if (newEmail.to && newEmail.subject && newEmail.body) {
      setIsSending(true);
      try {
        const response = await fetch('https://bluebash.onrender.com/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmail),
        });

        if (response.ok) {
          setMessage('Email sent successfully!');
          setNewEmail({ to: '', subject: '', body: '' });
          window.dispatchEvent(new CustomEvent('email-sent', { detail: newEmail }));
        } else {
          setMessage('Failed to send email.');
        }
      } catch (error) {
        setMessage('Error sending email.');
      } finally {
        setIsSending(false);
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  return (
    <div className="compose-email">
      <h2>Compose Email</h2>
      <input
      className='inputEmailApp'
        type="email"
        name="to"
        placeholder="To"
        value={newEmail.to}
        onChange={handleInputChange}
      />
      <input
       className='inputEmailApp'
        type="text"
        name="subject"
        placeholder="Subject"
        value={newEmail.subject}
        onChange={handleInputChange}
      />
      <textarea
        name="body"
        placeholder="Email Body"
        value={newEmail.body}
        onChange={handleInputChange}
      />

      <button onClick={handleSend} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send Email'}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SendEmail;

import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, sender, room }) => {
  const [content, setMessage] = useState('');

  const sendMessage = () => {
    if (content !== '') {
      const timestamp = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { sender, room, content, timestamp });
      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={content}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};
export default SendMessage
import styles from './styles.module.css';
import { useState, useEffect ,useRef} from 'react';


const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
        console.log("data");
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
        content: data.content,
          sender: data.sender,
          timestamp: data.timestamp,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages) => {
        console.log(last100Messages);
    //   console.log('Last 100 messages:', JSON.parse(last100Messages));
    console.log('last_100_message');
    //   last100Messages = JSON.parse(last100Messages);
      // Sort these messages by timestamp_
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);

  // Add this
  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  // Add this
  function sortMessagesByDate(content) {
    console.log("content");
    console.log(content);
    return content.sort(
      (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.sender}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.timestamp)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
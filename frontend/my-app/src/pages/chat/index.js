
import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send-message';
import RoomAndUsersColumn from './room-and-users'; // Add this

const Chat = ({ sender, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
       <RoomAndUsersColumn socket={socket} sender={sender} room={room} />
      <div>
        
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} sender={sender} room={room} />
       
      </div>
    </div>
  );
};

export default Chat;
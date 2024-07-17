import './App.css';
import { useState } from 'react';
import Home from './pages/home/index2';
import Chat from './pages/chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function App() {
  const [sender, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
              sender={sender}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          {/* Add this */}
          <Route
            path='/chat'
            element={<Chat sender={sender} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
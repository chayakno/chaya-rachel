import './App.css';
import { useState } from 'react';
import Home from './pages/home/index2';
import Chat from './pages/chat';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
// import StudentsComponent from './TestComponent'
import store from '../src/app/store'
import { Provider } from 'react-redux';
import TabContext from './Components/nevigateAdmin'
// import SignInUpForm from "./Components/sign-in"
import { Login, Signup } from "./JWT";
import Homee from './JWT/Homee';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const socket = io.connect('http://localhost:5000');

function App() {
  const [sender, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
  

    <div className="App">
    <Routes>
      <Route path="/" element={<Homee />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>


    {/* <Provider store={store} >  */}
    {/* <TabContext/> */}
   {/* <SignInUpForm/> */}

 {/* </Provider> */}

  </div>

  //
  
    // <Router>
    //   <div className='App'>
    //     <Routes>
    //       <Route
    //         path='/'
    //         element={
    //           <Home
    //           sender={sender}
    //             setUsername={setUsername}
    //             room={room}
    //             setRoom={setRoom}
    //             socket={socket}
    //           />
    //         }
    //       />
    //       {/* Add this */}
    //       <Route
    //         path='/chat'
    //         element={<Chat sender={sender} room={room} socket={socket} />}
    //       />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comments from "./components/Comments";
import Task from "./components/Task";
import Login from "./components/Login";
import socketIO from 'socket.io-client';

const socket = socketIO.connect(process.env.REACT_APP_API_URL || 'http://localhost:4000');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/tasks' element={<Task socket={socket} />} />
        <Route path='/comments/:category/:id' element={<Comments socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

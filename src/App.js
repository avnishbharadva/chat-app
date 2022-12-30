import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHome from './components/Admin/AdminHome';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/admin' element={<AdminHome/>} />
      </Routes>
    </div>
  );
}

export default App;

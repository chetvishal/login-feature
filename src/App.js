import logo from './logo.svg';
import './App.css';
import { Home, Login } from './Pages/index';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App h-screen bg-blue-400">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

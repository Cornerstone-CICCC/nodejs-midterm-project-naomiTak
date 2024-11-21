import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header'
import { Search } from './components/Search'
import { Login } from './Login'
import { Profile } from './Profile'
import './App.css';

function App() {
  return (
    <BrowserRouter>    
      <div className="App">
        <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="//login/profile" element={<Profile />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

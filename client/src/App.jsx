import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from './context/UserContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';

function App() {

  const [authorized, setAuthorized] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Nav />
            <Routes>
                <Route index element={<LoginPage authorized={authorized} setAuthorized={setAuthorized}/>}/>
                {/* <Route path="/logout" element={<Logout/>}/> */}
                <Route path="/dashboard" element={<Dashboard setAuthorized={setAuthorized}/>}/>
            </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

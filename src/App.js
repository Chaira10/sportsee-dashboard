import React from 'react';
// import { UserProvider } from './context/Context.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/SideBar/Sidebar';
import { UserProvider } from './context/Context';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error/Error';

function App() {
  
  return (
    <div>
    {/* Utilisation de BrowserRouter pour définir le routage */}
    
    <BrowserRouter>
        <Routes>
          <Route path="/:userId" element={<UserProvider><Dashboard /></UserProvider>} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />

        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/SideBar/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    
    <div className="App">
      <Navbar />
      <Sidebar />
      <Dashboard />
      
    </div>
  );
}

export default App;

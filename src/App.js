import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserInfo from './components/UserInfo';
import Dashboard from './pages/Dashboard';

function App() {
  const userId = 12;
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Dashboard userId={userId}/>
    </div>
  );
}

export default App;

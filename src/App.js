import { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserInfo from './components/UserInfo';
import Dashboard from './pages/Dashboard';
import { Provider } from './context/Context';

function App() {
  const userId = 12;
  // const context = useContext(Context);
  // console.log(context);
  return (
    
    <div className="App">
        <Provider> 
      <Navbar />
      <Sidebar />
      <Dashboard userId={userId}/>
      </Provider>
    </div>
  );
}

export default App;

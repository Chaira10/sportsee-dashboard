import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/SideBar/Sidebar';
import NotFound from '../../components/NotFound/NotFound';
import './Error.css';

export default function Error() {
  return (
    <div className="container-dashboard">
    <Navbar />
    <Sidebar />
    <NotFound />
    </div>
  )
}

import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="btn-container">
            <ul className="side-container">
                <li className="side-link"><img src="/images/logo1.png" alt="logo" className="side-link" /></li>
                <li className="side-link"><img src="/images/logo2.png" alt="logo" className="side-link" /></li>
                <li className="side-link"><img src="/images/logo3.png" alt="logo" className="side-link" /></li>
                <li className="side-link"><img src="/images/logo4.png" alt="logo" className="side-link" /></li>
            </ul>
            <div className="copyright">
            <p className="copyright-txt">Copyright, SportSee 2023</p>
        </div>
        </div>

    </div>
  )
}

export default Sidebar
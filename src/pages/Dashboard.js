import React from 'react';
import UserInfo from '../components/UserInfo.jsx';
import './Dashboard.css';


function Dashboard() {
    const userId = 12;
  return (
    <div className="container-dashboard">
        <UserInfo userId={userId}/>
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                    <div className="graphique">
                    graphique
                    </div>
                    </div>
                    <div className="row">
                        <div className="card-chart">session</div>
                        <div className="card-chart">intensité</div>
                        <div className="card-chart">score</div>
                    </div>

                </div>
                <div className="col-4 card-side">
                    <div className="side-card">
                        <div className="side-logo"><img src="/images/logo5.png" alt="logo" /></div>
                        <div className="side-text">calorie</div>

                    </div>
                    <div className="side-card">
                    <div className="side-logo"><img src="/images/logo6.png" alt="logo" /></div>
                        <div className="side-text">proteine</div>
                    </div>
                    <div className="side-card">
                    <div className="side-logo"><img src="/images/logo7.png" alt="logo" /></div>
                        <div className="side-text">glucide</div>
                    </div>
                    <div className="side-card">
                    <div className="side-logo"><img src="/images/logo8.png" alt="logo" /></div>
                        <div className="side-text">lipides</div>
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Dashboard
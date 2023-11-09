import React from 'react';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import './Dashboard.css';
import BarCharts from '../components/Charts/BarChart/BarChart.jsx';
import RadarsChart from '../components/Charts/RadarChart/RadarsChart.jsx';
import PieCharts from '../components/Charts/PieChart/PieCharts.jsx';
import LineCharts from '../components/Charts/LineChart/LineChart.jsx';
import { useUser } from '../context/Context.jsx';



function Dashboard() {

  const {userData} = useUser();
  console.log(userData);

  // Vérifiez si userData est défini avant d'accéder à ses propriétés
  const calorieCount = userData?.keyData?.calorieCount;
  const proteinCount = userData?.keyData?.proteinCount;
  const carbohydrateCount = userData?.keyData?.carbohydrateCount;
  const lipidCount = userData?.keyData?.lipidCount;

  return (
    <div className="container-dashboard">
      <UserInfo />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div className="graphique">
              <BarCharts    />
              </div>
            </div>
            <div className="row charts">
              <div className="card-chart session">

              <LineCharts   />
              </div>
              <div className="card-chart intensite">
              <RadarsChart   />
              </div>
              <div className="card-chart score" >

              <PieCharts />
              </div>
            </div>
          </div>
          <div className="col-4 card-side">
            {/* Utilisez la condition ternaire pour afficher les valeurs lorsque userData est défini */}
            {userData ? (
              <>
                <div className="side-card">
                  <div className="side-logo"><img src="/images/logo5.png" alt="logo" /></div>
                  <div className="side-text"><p className="side-p">{calorieCount}kCal</p><p className="side-t">Calories</p></div>
                </div>
                <div className="side-card">
                  <div className="side-logo"><img src="/images/logo6.png" alt="logo" /></div>
                  <div className="side-text"><p className="side-p">{proteinCount}g</p><p className="side-t">Protéines</p></div>
                </div>
                <div className="side-card">
                  <div className="side-logo"><img src="/images/logo7.png" alt="logo" /></div>
                  <div className="side-text"><p className="side-p">{carbohydrateCount}g</p><p className="side-t">Glucides</p></div>
                </div>
                <div className="side-card">
                  <div className="side-logo"><img src="/images/logo8.png" alt="logo" /></div>
                  <div className="side-text"><p className="side-p">{lipidCount}g</p><p className="side-t">Lipides</p></div>
                </div>
              </>
            ) : (
              <div>Chargement en cours...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

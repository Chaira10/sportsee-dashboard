import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo.jsx';
import './Dashboard.css';
import { getUsers } from '../ServiceApi';
import BarCharts from '../components/BarChart.jsx';
import AreaCharts from '../components/AreaChart.jsx';

function Dashboard() {
  const userId = 12;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Utilisez la fonction getUsers pour récupérer les données de l'utilisateur spécifié
    getUsers(userId)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données utilisateur : ', error);
      });
  }, [userId]);

  // Vérifiez si userData est défini avant d'accéder à ses propriétés
  const calorieCount = userData?.keyData.calorieCount;
  const proteinCount = userData?.keyData.proteinCount;
  const carbohydrateCount = userData?.keyData.carbohydrateCount;
  const lipidCount = userData?.keyData.lipidCount;

  return (
    <div className="container-dashboard">
      <UserInfo userId={userId} />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div className="graphique">
              <BarCharts userId={userId} />
              </div>
            </div>
            <div className="row">
              <div className="card-chart session">
              <AreaCharts userId={userId} />
              </div>
              <div className="card-chart">intensité</div>
              <div className="card-chart">score</div>
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

import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi'; 
import './ScoreChart.css';

function ScoreChart({ userId }) {
    const [userScore, setUserScore] = useState(0);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      getUsers(userId)
        .then((user) => {
          setUserData(user);
          setUserScore(user.todayScore); // Mettre à jour le score de l'utilisateur
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données utilisateur : ', error);
        });
    }, [userId]);
  
    if (!userData) {
      return <div>Chargement en cours...</div>;
    }
  
  
    const percentage = userScore * 100;

    // Calculer le rayon en fonction du pourcentage
  const radius = 80; // Rayon initial (ajustez selon vos besoins)
  const circleLength = 2 * Math.PI * radius; // Circonférence du cercle

  // Calculer la longueur du trait (dasharray) en fonction du pourcentage
  const dashArray = circleLength;
  const dashOffset = circleLength - (circleLength * percentage) / 100;

  return (
    <div className="circle-progress">
      <svg className="circle-svg" width="200" height="200">
        <circle className="circle-background" cx="100" cy="100" r={radius} />
        <circle
          className="circle-fill"
          cx="100"
          cy="100"
          r={radius}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            fill: 'white',
          }}
        />
<text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="circle-text"
          transform="rotate(90 100 100)" // Ajuster l'angle de rotation ici
        >
          {percentage}%
          <tspan x="50%" dy="25" fill="#444754"  className="secondary-text">
            de votre 
        </tspan>
        <tspan x="50%" dy="25" fill="#444754" className="secondary-text">
            objectif
        </tspan>
        </text>
      </svg>
    </div>
  );
}

export default ScoreChart
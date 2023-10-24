import React, { useEffect, useState } from 'react';
import { getPerformanceData } from '../ServiceApi';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

function RadarsChart({ userId }) {
    const [performanceData, setPerformanceData] = useState([]);

    useEffect(() => {
        // Utilisez la fonction getPerformanceData pour récupérer les données de performance
        getPerformanceData(userId)
          .then((data) => {
            setPerformanceData(data);

          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des données de performance : ', error);
          });
      }, [userId]);
  
 


    return (
      // <div className="profile-performance">
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart   data={performanceData} cx="50%" cy="50%"  outerRadius={'70%'}>
          <PolarAngleAxis dataKey="kind" axisLine={false} tickLine={false}  tickSize={25} stroke="#FFFFFF" tickFormatter={(value) => {
            switch (value) {
              case 'cardio':
                return 'Cardio';
              case 'energy':
                return 'Énergie';
              case 'endurance':
                return 'Endurance';
              case 'strength':
                return 'Force';
              case 'speed':
                return 'Vitesse';
              case 'intensity':
                return 'Intensité';
              default:
                return value;
            }
          }} />
          <PolarGrid radialLines={false} stroke="white" strokeWidth={2} polarRadius={[10, 22, 45, 70, 100]} className="hidden-line"/>

          <Radar name="Performance" dataKey="value" stroke="red" fill="#FF0101" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      // {/* </div> */}
    );
  }

export default RadarsChart
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
        <ResponsiveContainer width="99%" height={210}>
        <RadarChart cx="50%" cy="50%" outerRadius="51%" data={performanceData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" tickFormatter={(value) => {
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
          <Radar name="Performance" dataKey="value" stroke="red" fill="red" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

export default RadarsChart
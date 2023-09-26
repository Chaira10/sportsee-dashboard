import React, { useEffect, useState } from 'react';
import { getAverages } from '../ServiceApi'; 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AreaCharts({ userId }) {
    const [averageData, setAverageData] = useState([]);

    useEffect(() => {
      // Utilisez la fonction getAverages pour récupérer les données d'activité moyenne
      getAverages(userId)
        .then((averages) => {
          setAverageData(averages);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données d\'activité moyenne : ', error);
        });
    }, [userId]); // Assurez-vous que cette dépendance est correctement configurée
  
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Formatez les données d'activité moyenne pour utiliser les lettres des jours de la semaine
  const formattedData = averageData.map((session, index) => ({
    name: daysOfWeek[index], // Utilisez la lettre correspondante au jour de la semaine
    uv: session.sessionLength,
  }));
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={500}
          data={formattedData} // Utilisez les données formatées ici
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="white" fill="red" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  

export default AreaCharts